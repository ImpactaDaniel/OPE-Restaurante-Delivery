from datetime import timedelta
import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=12)
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'chave-boa'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt_secret'
    GOOGLE_KEY = os.environ.get('GOOGLE_KEY')
    ORIGIN = os.environ.get('ORIGIN')

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    EMAIL_FROM =  'efgs96@gmail.com'
    EMAIL_PASSWORD = 'Murilo3012'
    FLASK_DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URI') or \
        f'sqlite:///{os.path.join(basedir, "data-dev-sqlite.db")}'

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URI') or \
        'sqlite://'

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI') or \
        f'sqlite:///{os.path.join(basedir, "data.sqlite")}'

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig
}