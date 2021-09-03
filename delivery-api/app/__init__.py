from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from config import config
from flask import Flask

db = SQLAlchemy()
jwt = JWTManager()
mail = Mail()

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    db.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint, url_prefix='/api/v1')

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/api/v1/auth')

    return app