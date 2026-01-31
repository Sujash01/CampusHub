from database.db import Database


class Announcement:
    @staticmethod
    def create(title, content, priority, admin_id):
        conn = Database.get_connection()
        cursor = conn.cursor()

        query = """
        INSERT INTO announcements (title, content, priority, created_by)
        VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query, (title, content, priority, admin_id))
        conn.commit()

        cursor.close()
        conn.close()

    @staticmethod
    def get_all():
        conn = Database.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT a.id, a.title, a.content, a.priority,
               a.created_at, u.name AS author
        FROM announcements a
        JOIN users u ON a.created_by = u.id
        ORDER BY a.created_at DESC
        """
        cursor.execute(query)
        announcements = cursor.fetchall()

        cursor.close()
        conn.close()
        return announcements

    @staticmethod
    def delete(announcement_id):
        conn = Database.get_connection()
        cursor = conn.cursor()

        query = "DELETE FROM announcements WHERE id = %s"
        cursor.execute(query, (announcement_id,))
        conn.commit()

        cursor.close()
        conn.close()
