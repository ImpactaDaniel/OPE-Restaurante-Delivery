from flask import jsonify
from app.exceptions import ValidationError
from . import main


def bad_request(message):
    response = jsonify({'error': 'Bad request', 'message': message})
    response.status_code = 400
    return response

def unauthorized(message):
    response = jsonify({'error': 'Unauthorized', 'message': message})
    response.status_code = 401
    return response

def forbidden(message):
    response = jsonify({'error': 'Forbidden', 'message': message})
    response.status_code = 403
    return response

def not_found(message):
    response = jsonify({'error': 'Not found', 'message': message})
    response.status_code = 404
    return response

def internal_error(message):
    response = jsonify({'error': 'Not found', 'message': message})
    response.status_code = 500
    return response

@main.errorhandler(ValidationError)
def validation_error(e):
    return bad_request(e.args[0])