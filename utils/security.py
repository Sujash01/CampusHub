from werkzeug.security import generate_password_hash, check_password_hash

def hash_password(password: str) -> str:
    # Always use werkzeug’s hashing
    return generate_password_hash(password)

def verify_password(password: str, password_hash: str) -> bool:
    # Correct way to verify hashed passwords
    return check_password_hash(password_hash, password)
