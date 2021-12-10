from datetime import timedelta
import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=5)
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'chave-boa'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt_secret'
    GOOGLE_KEY = os.environ.get('GOOGLE_KEY')
    ORIGIN = os.environ.get('ORIGIN')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.googlemail.com')
    MAIL_PORT = int(os.environ.get('MAIL_PORT', '587'))
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', 'true').lower() in \
        ['true', 'on', '1']
    MAIL_USERNAME = 'noreply.restaurante.mataburro@gmail.com'
    EMAIL_FROM =  'noreply.restaurante.mataburro@gmail.com'
    MAIL_PASSWORD = 'TCC!mp4ct4'
    EMAIL_PREFIX = '[Mata-Burro]'

    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    FLASK_DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URI') or \
        f'sqlite:///{os.path.join(basedir, "data-dev-sqlite.db")}'

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URI') or \
        'sqlite://'

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI') or \
        f'postgresql://bxhinslo:HORB0716-d55PYQeVQbssjlhAPbIBxXi@motty.db.elephantsql.com/bxhinslo'

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig
}