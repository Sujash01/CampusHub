from models.events import Event


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
