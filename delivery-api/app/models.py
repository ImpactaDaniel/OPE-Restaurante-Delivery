from werkzeug.security import generate_password_hash, check_password_hash
from marshmallow import Schema, fields
from datetime import datetime
from time import time
import jwt
import os
from . import db


role_name = {
    '4': 'Administrador',
    '3': 'Gerente',
    '2': 'Empregado',
    '1': 'Motoboy'
}


class Permission:
    USER = 2
    EMPLOYEE = 4
    MANAGER = 8
    ADMIN = 16


class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, index=True)
    description = db.Column(db.String(512), index=True)
    price = db.Column(db.String(64), index=True)
    payment = db.Column(db.String(64), index=True)
    address = db.Column(db.String(512), index=True)
    status = db.Column(db.String, default='done', index=True)
    created_at = db.Column(db.DateTime(), index=True, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), index=True, default=datetime.utcnow)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), default=None)

    def done(self):
        self.status = 'done'
        db.session.add(self)
        db.session.commit()
    
    def ready(self):
        self.status = 'ready'
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f'{self.title}'


class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    default = db.Column(db.Boolean, default=False, index=True)
    permissions = db.Column(db.Integer)
    users = db.relationship('User', backref='role', lazy='dynamic')

    def __init__(self, **kwargs):
        super(Role, self).__init__(**kwargs)
        if self.permissions is None:
            self.permissions = 0
    
    def has_permission(self, perm):
        return self.permissions & perm == perm

    def add_permission(self, perm):
        if not self.has_permission(perm):
            self.permissions += perm
    
    def remove_permission(self, perm):
        if self.has_permission(self, perm):
            self.permissions -= perm

    def reset_permission(self):
        self.permissions = 0

    @staticmethod
    def insert_roles():
        roles = {
            'User': [Permission.USER],
            'Employee': [Permission.USER, Permission.EMPLOYEE],
            'Manager': [Permission.USER, Permission.EMPLOYEE, Permission.MANAGER],
            'Administrator': [Permission.USER, Permission.EMPLOYEE, Permission.MANAGER, Permission.ADMIN]
        }
        default_role = 'User'
        for option in roles:
            role = Role.query.filter_by(name=option).first()
            if role is None:
                role = Role(name=option)
            role.reset_permission()
            for perm in roles[option]:
                role.add_permission(perm)
            role.default = (role.name == default_role)
            db.session.add(role)
        db.session.commit()

    def __repr__(self):
        return f'<Role {self.name}>'


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True)
    registered_at = db.Column(db.DateTime(), default=datetime.utcnow)
    status = db.Column(db.Boolean, default=False, index=True)
    last_seen = db.Column(db.DateTime(), default=datetime.utcnow)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    password_hash = db.Column(db.String(128))
    email = db.Column(db.String(64), index=True)
    cpf = db.Column(db.String(64))
    cellphone = db.Column(db.String(64), index=True)
    name = db.Column(db.String(64), index=True)
    birth_date = db.Column(db.String(64))
    rg = db.Column(db.String(64))
    city = db.Column(db.String(64), index=True)
    state = db.Column(db.String(64), index=True)
    number = db.Column(db.String(64), index=True)
    street = db.Column(db.String(256), index=True)
    zipcode = db.Column(db.String(64), index=True)
    district = db.Column(db.String(64), index=True)
    bank = db.Column(db.String(128), index=True)
    bank_number = db.Column(db.String(64), index=True)
    agency = db.Column(db.String(64), index=True)
    motor_brand = db.Column(db.String(64), index=True)
    motor_model = db.Column(db.String(64), index=True)
    motor_year = db.Column(db.String(64), index=True)
    is_first_login = db.Column(db.Boolean, default=True)
    orders = db.relationship('Order', backref='author')

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        if self.role is None:
            if self.username == 'Admin':
                self.role = Role.query.filter_by(name='Administrator').first()
            elif self.role is None:
                self.role = Role.query.filter_by(default=True).first()

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')
    
    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def can(self, perm):
        return self.role is not None and self.role.has_permission(perm)
    
    def is_administrator(self):
        return self.can(Permission.ADMIN)

    def ping(self):
        self.last_seen = datetime.utcnow()
        db.session.add(self)
        db.session.commit() 

    def change_status(self):
        self.status = not self.status
        db.session.add(self)
        db.session.commit()
    
    def get_reset_token(self, expires=50000000):
        JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
        return jwt.encode({'reset_token': self.username,
                           'exp': time() + expires},
                           key=JWT_SECRET_KEY,
                           algorithm='HS256')
    
    def verify_reset_token(token):
        try:
            JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
            username = jwt.decode(token,
                                   key=JWT_SECRET_KEY,
                                   algorithms='HS256')['reset_token']
            print(username)
        except Exception:
            return
        return User.query.filter_by(username=username).first()

    def __repr__(self):
        return f'<User {self.username}>'


class RoleSchema(Schema):
    name = fields.String()

class UserSchema(Schema):
    name = fields.String()
    username = fields.String()
    email = fields.String()
    cellphone = fields.String()
    role = fields.Nested(RoleSchema(only=('name',)))
    last_seen = fields.String()
    status = fields.Boolean()

class OrderSchema(Schema):
    author = fields.Nested(UserSchema(only=('name', 'cellphone')))
    title = fields.String()
    description = fields.String()
    price = fields.String()
    payment = fields.String()
    address = fields.String()
    status = fields.String()
    created_at = fields.String()
    updated_at = fields.String()