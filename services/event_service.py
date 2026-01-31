from models.event import Event
from models.event_registration import EventRegistration


class EventService:
    @staticmethod
    def create(title, description, location, event_date, admin_id):
        if not title or not description or not event_date:
            return {"error": "Missing required fields"}

        Event.create(title, description, location, event_date, admin_id)
        return {"message": "Event created"}

    @staticmethod
    def get_all():
        return Event.get_all()

    @staticmethod
    def register(event_id, user_id):
        status = Event.get_status(event_id)
        if status != "open":
            return {"error": "Registrations closed"}

        try:
            EventRegistration.register(event_id, user_id)
        except Exception:
            return {"error": "Already registered"}

        return {"message": "Registered successfully"}

    @staticmethod
    def unregister(event_id, user_id):
        EventRegistration.unregister(event_id, user_id)
        return {"message": "Unregistered"}

    @staticmethod
    def close(event_id):
        Event.set_status(event_id, "closed")
        return {"message": "Event closed"}

    @staticmethod
    def open(event_id):
        Event.set_status(event_id, "open")
        return {"message": "Event opened"}

    @staticmethod
    def attendees(event_id):
        return EventRegistration.list_attendees(event_id)
