from database.db import Database


class AdminService:
    @staticmethod
    def get_all_users():
        conn = Database.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT id, name, email, role, is_active, created_at
        FROM users
        """
        cursor.execute(query)
        users = cursor.fetchall()

        cursor.close()
        conn.close()
        return users
