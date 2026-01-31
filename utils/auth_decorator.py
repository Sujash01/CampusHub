from functools import wraps
from flask import request, jsonify, g
from utils.jwt_utils import decode_token
import jwt


def jwt_required(role=None):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            auth_header = request.headers.get("Authorization")

            if not auth_header:
                return jsonify({"error": "Token missing"}), 401

            try:
                token = auth_header.split(" ")[1]
                payload = decode_token(token)

                # 🔑 Attach payload to request context
                g.user = payload

                if role and payload["role"] != role:
                    return jsonify({"error": "Access denied"}), 403

            except jwt.ExpiredSignatureError:
                return jsonify({"error": "Token expired"}), 401
            except Exception:
                return jsonify({"error": "Invalid token"}), 401

            return fn(*args, **kwargs)

        return wrapper
    return decorator
