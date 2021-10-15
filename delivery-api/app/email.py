from threading import Thread
from flask import current_app, render_template
from flask_mail import Message
from . import mail


def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)


def send_email(to, subject, **kwargs):
    app = current_app._get_current_object()
    msg = Message(f'{app.config["EMAIL_PREFIX"]} {subject}',
                  sender=app.config['EMAIL_FROM'], recipients=[to])
    msg.body = "\nAqui estão suas credenciais de login:\n\n"\
                f"Usuário: {kwargs.get('username')}\n"\
                f"Senha: {kwargs.get('password')}"
    thr = Thread(target=send_async_email, args=[app, msg])
    thr.start()
    return thr

def send_recovery_email(user):
    app = current_app._get_current_object()
    token = user.get_reset_token()
    msg = Message(f'{app.config["EMAIL_PREFIX"]} Redefinição de senha',
                  sender=app.config['EMAIL_FROM'], recipients=[str(user.email)])
    msg.html = render_template('reset_email.html',
                                user=user,
                                token=token)
    thr = Thread(target=send_async_email, args=[app, msg])
    thr.start()
    return thr