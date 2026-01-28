import os
from flask import Flask

from config.dev import DevConfig
from config.prod import ProdConfig


def create_app():
    app = Flask(__name__)

    # Decide environment
    env = os.getenv("FLASK_ENV", "development")

    if env == "production":
        app.config.from_object(ProdConfig)
    else:
        app.config.from_object(DevConfig)

    @app.route("/")
    def health_check():
        return "CampusHub backend running"

    return app


if __name__ == "__main__":
    app = create_app()
    app.run()
