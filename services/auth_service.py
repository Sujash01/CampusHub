from models.users import User
from utils.security import hash_password


class AuthService:
    @staticmethod
    def signup(name, email, password):
        # Check if user already exists
        existing_user = User.find_by_email(email)
        if existing_user:
            return {"error": "User already exists"}

        password_hash = hash_password(password)

        User.create(
            name=name,
            email=email,
            password_hash=password_hash,
            role="student"
        )

        return {"message": "User created successfully"}
