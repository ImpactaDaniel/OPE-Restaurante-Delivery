import unittest
from app.models import User, Permission

class UserModelTestCase(unittest.TestCase):
    def test_password_setter(self):
        user = User(password='StrongPassword')
        self.assertTrue(user.password_hash is not None)
    
    def test_no_password_getter(self):
        user = User(password='StrongPassword')
        with self.assertRaises(AttributeError):
            user.password
    
    def test_password_verification(self):
        user = User(password='StrongPassword')
        self.assertTrue(user.verify_password('StrongPassword'))
        self.assertFalse(user.verify_password('ShitPassword'))
    
    def test_password_salts_are_random(self):
        first_user = User(password='StrongPassword')
        second_user = User(password='AnotherStrongPassword')
        self.assertTrue(first_user.password_hash != second_user.password_hash)
    
    def test_user_role(self):
        user = User(username='autotest', password='autotest')
        self.assertTrue(user.can(Permission.USER))
        self.assertFalse(user.can(Permission.MANAGER))
        self.assertFalse(user.can(Permission.ADMIN))
