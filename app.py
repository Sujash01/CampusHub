import os
from flask import Flask

from config.dev import DevConfig
from config.prod import ProdConfig
from database.db import Database


def create_app():
    app = Flask(__name__)

    env = os.getenv("FLASK_ENV", "development")

    if env == "production":
        app.config.from_object(ProdConfig)
    else:
        app.config.from_object(DevConfig)

    # Initialize DB pool
    with app.app_context():
        Database.init_pool()

    @app.route("/")
    def health_check():
        return "CampusHub backend running"

    @app.route("/db-test")
    def db_test():
        conn = Database.get_connection()
        if conn.is_connected():
            conn.close()
            return "Database connected successfully"
        return "Database connection failed"

    return app


if __name__ == "__main__":
    app = create_app()
    app.run()
