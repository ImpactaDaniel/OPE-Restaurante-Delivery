from ..models import User, UserSchema, Order, OrderSchema
from flask import jsonify, request, current_app
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_cors import cross_origin
from ..decorators import admin_required, manager_required
from geopy.geocoders import Nominatim
from .errors import bad_request
import pycep_correios
from . import main
from .. import db
import requests

@main.post('/calculate-distance')
@jwt_required()
def calculate_distance():
    app = current_app._get_current_object()
    ORIGIN = app.config['ORIGIN']
    GOOGLE_KEY = app.config['GOOGLE_KEY']
    input_data = request.get_json()
    destination_cep = input_data['CEP']
    try:
        address = pycep_correios.get_address_from_cep(destination_cep)
        geolocator = Nominatim(user_agent='Delivery')
        destination = geolocator.geocode(f'{address["logradouro"]}, '
                                         f'{address["cidade"]} - '
                                         f'{address["bairro"]}')
        response = requests.get(f'https://maps.googleapis.com/maps/api/distancematrix/'
                                f'json?units=imperial&origins={ORIGIN}'
                                f'&destinations=side_of_road:{destination.latitude}, '
                                f'{destination.longitude}&key={GOOGLE_KEY}')  
        travel_time = response.json()['rows'][0]['elements'][0]['duration']['text']
        return {'travel_time' :travel_time}
    except:
        return bad_request('Error in zip code query service')

@main.get('/users')
@jwt_required()
@manager_required
def users():
    users = User.query.all()
    users_schema = UserSchema(many=True, only=('username', 'status', 'last_seen'))
    result = users_schema.dump(users)
    return jsonify(result)

@main.get('/user')
@jwt_required()
def user():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    user_schema = UserSchema()
    result = user_schema.dump(user)
    orders = Order.query.filter_by(author=user).order_by(Order.updated_at.desc()).all()
    orders_schema = OrderSchema(many=True)
    order_result = orders_schema.dump(orders)
    result['orders'] = order_result
    return jsonify(result)

@main.post('/user/<username>')
@jwt_required()
@admin_required
def search_user(username):
    user = User.query.filter_by(username=username).first()
    if user:
        user_schema = UserSchema()
        result = user_schema.dump(user)
        return jsonify(result)
    return jsonify('User not found')

@main.get('/user/change-status')
@jwt_required()
@cross_origin()
def change_status():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    user.change_status()
    is_available = {False: 'unavailable',
                    True: 'available'}
    return jsonify({'status_name': f'{is_available[user.status]}',
                        'current_user': {
                            'username': user.username,
                            'role': f'{user.role.name}',
                            'status': user.status
                        }
                    })

@main.post('/order/create')
@jwt_required()
@manager_required
def order():
    try:
        payload = request.json.get('order')
    except:
        return bad_request('Invalid arguments')
    user = User.query.filter_by(username=get_jwt_identity()).first()
    order = Order(author=user,title=payload['title'],
                  description=payload['description'], price=payload['price'],
                  payment=payload['payment'], address=payload['address'],
                  status=payload['status'])
    db.session.add(order)
    db.session.commit()
    return jsonify('Order published successfully')

@main.get('/orders')
@jwt_required()
@manager_required
def orders():
    query_string = request.query_string
    query_param = query_string.decode('utf8')
    if query_param:
        orders = Order.query.filter_by(status=query_param).order_by(Order.updated_at.desc()).all()
    else:
        orders = Order.query.order_by(Order.updated_at.desc()).all()
    orders_schema = OrderSchema(many=True, only=('title', 'address', 'status', 'author'))
    result = orders_schema.dump(orders)
    return jsonify(result)

@main.delete('/order/delete')
@jwt_required()
@manager_required
def delete_order():
    title = request.json.get('order_title')
    try:
        order = Order.query.filter_by(title=title).first()
        db.session.delete(order)
        db.session.commit()
        return jsonify('Order has been removed successfully')
    except:
        return bad_request('Error')

@main.post('/order/done')
@jwt_required()
@manager_required
def done_order():
    title = request.json.get('order_title')
    try:
        order = Order.query.filter_by(title=title).first()
        order.done()
        return jsonify(f'Order {order.title} is {order.status}')
    except:
        return bad_request('Error')
