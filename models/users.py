from database.db import Database


class User:
    @staticmethod
    def create(name, email, password_hash, role="student"):
        conn = Database.get_connection()
        cursor = conn.cursor()

        query = """
        INSERT INTO users (name, email, password_hash, role)
        VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query, (name, email, password_hash, role))

        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def find_by_email(email):
        conn = Database.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = "SELECT * FROM users WHERE email = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()

        cursor.close()
        conn.close()
        return user
