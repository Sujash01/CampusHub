from database.db import Database


class Event:
    @staticmethod
    def create(title, description, location, event_date, admin_id):
        conn = Database.get_connection()
        cursor = conn.cursor()

        query = """
        INSERT INTO events (title, description, location, event_date, created_by)
        VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(
            query,
            (title, description, location, event_date, admin_id)
        )

        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def get_all():
        conn = Database.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT e.id, e.title, e.description, e.location,
               e.event_date, e.status, e.created_at,
               u.name AS author
        FROM events e
        JOIN users u ON e.created_by = u.id
        ORDER BY e.event_date ASC
        """
        cursor.execute(query)
        events = cursor.fetchall()

        cursor.close()
        conn.close()
        return events

    @staticmethod
    def get_status(event_id):
        conn = Database.get_connection()
        cursor = conn.cursor()

        query = "SELECT status FROM events WHERE id = %s"
        cursor.execute(query, (event_id,))
        row = cursor.fetchone()

        cursor.close()
        conn.close()

        return row[0] if row else None

    @staticmethod
    def set_status(event_id, status):
        conn = Database.get_connection()
        cursor = conn.cursor()

        query = "UPDATE events SET status = %s WHERE id = %s"
        cursor.execute(query, (status, event_id))

        conn.commit()
        cursor.close()
        conn.close()
