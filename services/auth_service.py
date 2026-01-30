from models.users import User
from utils.security import hash_password, verify_password
from utils.jwt_utils import generate_token


class AuthService:
    @staticmethod
    def signup(name, email, password):
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

    @staticmethod
    def login(email, password):
        user = User.find_by_email(email)

        if not user:
            return {"error": "Invalid email or password"}

        if not verify_password(password, user["password_hash"]):
            return {"error": "Invalid email or password"}

        token = generate_token(user["id"], user["role"])

        return {
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
    }
