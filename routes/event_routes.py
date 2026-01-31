from flask import Blueprint, request, jsonify, g
from services.event_service import EventService
from utils.auth_decorator import jwt_required

event_bp = Blueprint("events", __name__, url_prefix="/events")


@event_bp.route("", methods=["GET"])
@jwt_required()
def get_events():
    events = EventService.get_all()
    return jsonify(events), 200


@event_bp.route("", methods=["POST"])
@jwt_required(role="admin")
def create_event():
    data = request.get_json()

    title = data.get("title")
    description = data.get("description")
    location = data.get("location")
    event_date = data.get("event_date")

    admin_id = g.user["user_id"]

    result = EventService.create(
        title, description, location, event_date, admin_id
    )

    if "error" in result:
        return jsonify(result), 400

    return jsonify(result), 201
