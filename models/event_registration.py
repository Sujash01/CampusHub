from database.db import Database


class EventRegistration:
    @staticmethod
    def register(event_id, user_id):
        conn = Database.get_connection()
        cursor = conn.cursor()
        query = """
        INSERT INTO event_registrations (event_id, user_id)
        VALUES (%s, %s)
        """
        cursor.execute(query, (event_id, user_id))
        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def unregister(event_id, user_id):
        conn = Database.get_connection()
        cursor = conn.cursor()
        query = """
        DELETE FROM event_registrations
        WHERE event_id=%s AND user_id=%s
        """
        cursor.execute(query, (event_id, user_id))
        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def count(event_id):
        conn = Database.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT COUNT(*) FROM event_registrations WHERE event_id=%s",
            (event_id,)
        )
        count = cursor.fetchone()[0]
        cursor.close()
        conn.close()
        return count

    @staticmethod
    def list_attendees(event_id):
        conn = Database.get_connection()
        cursor = conn.cursor(dictionary=True)
        query = """
        SELECT u.id, u.name, u.email
        FROM event_registrations er
        JOIN users u ON er.user_id = u.id
        WHERE er.event_id = %s
        """
        cursor.execute(query, (event_id,))
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return rows
@staticmethod
def is_registered(event_id, user_id):
    conn = Database.get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT 1 FROM event_registrations WHERE event_id=%s AND user_id=%s",
        (event_id, user_id)
    )
    exists = cursor.fetchone() is not None

    cursor.close()
    conn.close()
    return exists
