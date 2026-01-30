import jwt
from datetime import datetime, timedelta
from flask import current_app
import secrets
from datetime import datetime, timedelta

def generate_token(user_id, role):
    payload = {
        "user_id": user_id,
        "role": role,
        "exp": datetime.utcnow() + timedelta(
            minutes=current_app.config["JWT_EXP_MINUTES"]
        )
    }

    token = jwt.encode(
        payload,
        current_app.config["JWT_SECRET_KEY"],
        algorithm=current_app.config["JWT_ALGORITHM"]
    )

    return token


def decode_token(token):
    return jwt.decode(
        token,
        current_app.config["JWT_SECRET_KEY"],
        algorithms=[current_app.config["JWT_ALGORITHM"]]
    )

def generate_refresh_token():
    return secrets.token_urlsafe(64)


def refresh_token_expiry(days=7):
    return datetime.utcnow() + timedelta(days=days)

