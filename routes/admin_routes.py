from flask import Blueprint, jsonify
from utils.auth_decorator import jwt_required
from services.admin_service import AdminService

admin_bp = Blueprint("admin", __name__, url_prefix="/admin")


@admin_bp.route("/users", methods=["GET"])
@jwt_required(role="admin")
def get_all_users():
    users = AdminService.get_all_users()
    return jsonify(users), 200
