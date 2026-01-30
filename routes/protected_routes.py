from flask import Blueprint, jsonify
from utils.auth_decorator import jwt_required

protected_bp = Blueprint("protected", __name__)


@protected_bp.route("/dashboard")
@jwt_required()
def dashboard():
    return jsonify({"message": "Welcome to protected dashboard"})


@protected_bp.route("/admin")
@jwt_required(role="admin")
def admin_dashboard():
    return jsonify({"message": "Welcome admin"})
