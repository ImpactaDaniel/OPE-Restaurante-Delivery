from flask import jsonify
from .. import jwt


def unauthorized(message):
    response = jsonify({'error': 'Unauthorized', 'message': message})
    response.status_code = 401
    return response

def not_found(message):
    response = jsonify({'error': 'Not found', 'message': message})
    response.status_code = 404
    return response

def bad_request(message):
    response = jsonify({'error': 'Bad request', 'message': message})
    response.status_code = 400
    return response

def forbidden(message):
    response = jsonify({'error': 'Forbidden', 'message': message})
    response.status_code = 403
    return response

@jwt.unauthorized_loader
def unauthorized_jwt(e):
    return jsonify({'error': 'Unauthorized', 
                    'message': 'Missing authorization header'}), 401

@jwt.invalid_token_loader
def invalid_jwt(e):
    return jsonify({'error': 'Bad Request', 
                    'message': 'Invalid JWT Token'}), 400
