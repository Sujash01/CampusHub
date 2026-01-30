from database.db import Database


class RefreshToken:
    @staticmethod
    def create(user_id, token, expires_at):
        conn = Database.get_connection()
        cursor = conn.cursor()

        query = """
        INSERT INTO refresh_tokens (user_id, token, expires_at)
        VALUES (%s, %s, %s)
        """
        cursor.execute(query, (user_id, token, expires_at))
        conn.commit()

        cursor.close()
        conn.close()

    @staticmethod
    def find_valid(token):
        conn = Database.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT * FROM refresh_tokens
        WHERE token = %s AND revoked = FALSE AND expires_at > NOW()
        """
        cursor.execute(query, (token,))
        result = cursor.fetchone()

        cursor.close()
        conn.close()
        return result

    @staticmethod
    def revoke(token):
        conn = Database.get_connection()
        cursor = conn.cursor()

        query = "UPDATE refresh_tokens SET revoked = TRUE WHERE token = %s"
        cursor.execute(query, (token,))
        conn.commit()

        cursor.close()
        conn.close()
