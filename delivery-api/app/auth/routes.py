from ..decorators import admin_required
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from .errors import unauthorized, bad_request, forbidden, not_found
from flask_jwt_extended import jwt_required
from flask import request, jsonify
from .mailer import email_sender
from ..models import User
from .. import db
from . import auth


@auth.post('/login')
@cross_origin()
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(username=username).first()
    if user is not None and user.verify_password(password):
        user.ping()
        access_token = create_access_token(identity=username)
        return jsonify({'current_user': {
                            'username': user.username,
                            'role': f'{user.role.name}',
                            'status': user.status
                            },
                        'access_token': access_token})
    return unauthorized('Invalid credentials')

@auth.post('/register')
def register():
    user = request.json.get('user', None)
    personal = request.json.get('personal', None)
    cellphone = personal['phone']
    phone_number = f'{cellphone["area"]}{cellphone["number"]}'
    address = personal['address']
    payment = request.json.get('payment', None)
    motorcycle = request.json.get('motorcycle', None)
    try:
        new_user = User(username=user['username'], password=user['password'],
                    name=personal['name'], birth_date=personal['birth_date'], email=personal['email'],
                    cpf=personal['cpf'], rg=personal['rg'], cellphone=phone_number,
                    state=address['state'], city=address['city'], street=address['street'],
                    number=address['number'], zipcode=address['zipcode'], district=address['district'],
                    bank=payment['bank_code'], bank_number=payment['number'], agency=payment['agency_code'],
                    motor_brand=motorcycle['brand'], motor_model=motorcycle['model'], motor_year=motorcycle['year'])
        db.session.add(new_user)
        db.session.commit()
        try:
            email_sender(target=personal['email'],
                         username=user['username'],
                         password=user['password'])
        except:
            pass
        return jsonify({'status': 'Success',
                        'user': str(new_user.username)
                        }), 200
    except:
        return bad_request('Invalid arguments')

@auth.delete('/user/delete')
@jwt_required()
@admin_required
def delete():
    username = request.json.get('username', None)
    try:
        user = User.query.filter_by(username=username).first()
        db.session.delete(user)
        db.session.commit()
        return jsonify('User has been removed successfully'), 200
    except:
        return not_found('User not found')

@auth.post('/change-password')
@jwt_required()
@cross_origin()
def change_pasword():
    username = request.json.get('username', None)
    current_password = request.json.get('current_password', None)
    new_password = request.json.get('new_password', None)
    user = User.query.filter_by(username=username).first()
    if username == get_jwt_identity():
        if user is not None and user.verify_password(current_password):
            user.password = new_password
            db.session.add(user)
            db.session.commit()
            return jsonify('Password changed successfully')
    return forbidden('The change is only possible on the logged in user')