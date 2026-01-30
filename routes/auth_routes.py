from flask import Blueprint, request, jsonify
from services.auth_service import AuthService

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")


@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    result = AuthService.signup(name, email, password)

    if "error" in result:
        return jsonify(result), 400

    return jsonify(result), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    result = AuthService.login(email, password)

    if "error" in result:
        return jsonify(result), 401

    return jsonify(result), 200

@auth_bp.route("/refresh", methods=["POST"])
def refresh():
    data = request.get_json()
    refresh_token = data.get("refresh_token")

    if not refresh_token:
        return jsonify({"error": "Refresh token required"}), 400

    result = AuthService.refresh(refresh_token)

    if "error" in result:
        return jsonify(result), 401

    return jsonify(result), 200


@auth_bp.route("/logout", methods=["POST"])
def logout():
    data = request.get_json()
    refresh_token = data.get("refresh_token")

    if not refresh_token:
        return jsonify({"error": "Refresh token required"}), 400

    result = AuthService.logout(refresh_token)
    return jsonify(result), 200

