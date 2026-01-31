from flask import Blueprint, request, jsonify
from services.announcement_service import AnnouncementService
from utils.auth_decorator import jwt_required

announcement_bp = Blueprint(
    "announcements", __name__, url_prefix="/announcements"
)


@announcement_bp.route("", methods=["GET"])
@jwt_required()
def get_announcements():
    announcements = AnnouncementService.get_all()
    return jsonify(announcements), 200


@announcement_bp.route("", methods=["POST"])
@jwt_required(role="admin")
def create_announcement():
    data = request.get_json()

    title = data.get("title")
    content = data.get("content")
    priority = data.get("priority", "normal")

    result = AnnouncementService.create(
        title, content, priority, admin_id=1  # admin_id fix next
    )

    if "error" in result:
        return jsonify(result), 400

    return jsonify(result), 201


@announcement_bp.route("/<int:announcement_id>", methods=["DELETE"])
@jwt_required(role="admin")
def delete_announcement(announcement_id):
    result = AnnouncementService.delete(announcement_id)
    return jsonify(result), 200

@announcement_bp.route("/<int:announcement_id>", methods=["PUT"])
@jwt_required(role="admin")
def update_announcement(announcement_id):
    data = request.get_json()

    title = data.get("title")
    content = data.get("content")
    priority = data.get("priority", "normal")

    result = AnnouncementService.update(
        announcement_id, title, content, priority
    )

    if "error" in result:
        return jsonify(result), 400

    return jsonify(result), 200
