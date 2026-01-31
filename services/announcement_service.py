from models.announcement import Announcement


class AnnouncementService:
    @staticmethod
    def create(title, content, priority, admin_id):
        if not title or not content:
            return {"error": "Title and content are required"}

        Announcement.create(title, content, priority, admin_id)
        return {"message": "Announcement created"}

    @staticmethod
    def get_all():
        return Announcement.get_all()

    @staticmethod
    def delete(announcement_id):
        Announcement.delete(announcement_id)
        return {"message": "Announcement deleted"}
