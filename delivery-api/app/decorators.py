from flask_jwt_extended import get_jwt_identity
from .models import Permission, User
from functools import wraps
from .errors import forbidden

def permission_required(permission):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            current_user = get_jwt_identity()
            user = User.query.filter_by(username=current_user).first()
            if not user.can(permission):
                return forbidden('Insufficient permission')
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def admin_required(f):
    return permission_required(Permission.ADMIN)(f)

def manager_required(f):
    return permission_required(Permission.MANAGER)(f)