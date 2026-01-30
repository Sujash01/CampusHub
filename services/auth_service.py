from models.users import User
from models.refresh_token import RefreshToken
from utils.security import hash_password, verify_password
from utils.jwt_utils import (
    generate_token,
    generate_refresh_token,
    refresh_token_expiry
)


class AuthService:
    @staticmethod
    def signup(name, email, password):
        if User.find_by_email(email):
            return {"error": "User already exists"}

        password_hash = hash_password(password)

        User.create(
            name=name,
            email=email,
            password_hash=password_hash,
            role="student"
        )

        return {"message": "User created successfully"}

    @staticmethod
    def login(email, password):
        user = User.find_by_email(email)

        if not user or not verify_password(password, user["password_hash"]):
            return {"error": "Invalid email or password"}

        access_token = generate_token(user["id"], user["role"])
        refresh_token = generate_refresh_token()

        RefreshToken.create(
            user_id=user["id"],
            token=refresh_token,
            expires_at=refresh_token_expiry()
        )

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"],
                "role": user["role"]
            }
        }

    @staticmethod
    def refresh(refresh_token):
        stored = RefreshToken.find_valid(refresh_token)

        if not stored:
            return {"error": "Invalid refresh token"}

        user = User.find_by_email(stored["user_id"])  # explained below
        # ❗ we don’t actually need full user lookup here

        new_access_token = generate_token(
            stored["user_id"],
            stored.get("role", "student")
        )

        return {"access_token": new_access_token}

    @staticmethod
    def logout(refresh_token):
        RefreshToken.revoke(refresh_token)
        return {"message": "Logged out successfully"}
