"""Initialize app."""
from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate

from hoops_app.seed import seed_db
from hoops_app.models import db

migrate = Migrate()
login_manager = LoginManager()
cors = CORS()


def create_app():
    """Construct the core app object."""
    app = Flask(__name__, instance_relative_config=False)

    # Application Configuration
    app.config.from_object("config.Config")

    # Initialize Plugins
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})
    with app.app_context():
        from . import routes
        from . import auth
        from . import api

        # from .assets import compile_assets

        # Register Blueprints
        app.register_blueprint(routes.main_bp)
        app.register_blueprint(auth.auth_bp)
        app.register_blueprint(api.api)

        # Create Database Models
        db.drop_all()
        db.create_all()
        seed_db(db)

        return app