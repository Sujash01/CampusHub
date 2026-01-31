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

    @event_bp.route("/<int:event_id>/register", methods=["POST"])
    @jwt_required()
    def register_event(event_id):
        from flask import g
        result = EventService.register(event_id, g.user["user_id"])
        if "error" in result:
            return jsonify(result), 400
        return jsonify(result), 200


@event_bp.route("/<int:event_id>/unregister", methods=["POST"])
@jwt_required()
def unregister_event(event_id):
    from flask import g
    result = EventService.unregister(event_id, g.user["user_id"])
    return jsonify(result), 200


@event_bp.route("/<int:event_id>/close", methods=["POST"])
@jwt_required(role="admin")
def close_event(event_id):
    return jsonify(EventService.close(event_id)), 200


@event_bp.route("/<int:event_id>/open", methods=["POST"])
@jwt_required(role="admin")
def open_event(event_id):
    return jsonify(EventService.open(event_id)), 200


@event_bp.route("/<int:event_id>/attendees", methods=["GET"])
@jwt_required(role="admin")
def event_attendees(event_id):
    attendees = EventService.attendees(event_id)
    return jsonify(attendees), 200

@event_bp.route("/<int:event_id>/status", methods=["GET"])
@jwt_required()
def event_status(event_id):
    from flask import g
    is_registered = EventService.registration_status(
        event_id, g.user["user_id"]
    )
    return jsonify({"registered": is_registered}), 200
