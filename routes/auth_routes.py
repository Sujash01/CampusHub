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
