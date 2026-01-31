import os
from flask import Flask

from config.dev import DevConfig
from config.prod import ProdConfig
from database.db import Database
from models.users import User
from routes.auth_routes import auth_bp
from routes.protected_routes import protected_bp
from routes.admin_routes import admin_bp
from routes.announcement_routes import announcement_bp
from routes.event_routes import event_bp


def create_app():
    app = Flask(__name__)

    env = os.getenv("FLASK_ENV", "development")

    if env == "production":
        app.config.from_object(ProdConfig)
    else:
        app.config.from_object(DevConfig)

    with app.app_context():
        Database.init_pool()

    @app.route("/")
    def health_check():
        return "CampusHub backend running"

    # ✅ THIS MUST BE INSIDE create_app
    @app.route("/user-test")
    def user_test():
        user = User.find_by_email("test@example.com")
        return str(user)
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(protected_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(announcement_bp)
    app.register_blueprint(event_bp)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run()
