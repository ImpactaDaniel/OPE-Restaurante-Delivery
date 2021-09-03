from flask import current_app
import smtplib

def email_sender(target, username, password):
    app = current_app._get_current_object()
    EMAIL_FROM = app.config['EMAIL_FROM']
    EMAIL_PASSWORD = app.config['EMAIL_PASSWORD']
    smtp = 'smtp.gmail.com'
    server = smtplib.SMTP(smtp, 587)
    server.starttls()
    server.login(EMAIL_FROM, EMAIL_PASSWORD)

    message = "\nAqui estão suas credenciais de login:\n\n"\
                f"Usuário: {username}\n"\
                f"Senha: {password}"

    def send_message():
        _message = "\r\n".join([
                f"From: {EMAIL_FROM}",
                "Subject: [Mata-Burro] Seja bem-vindo!",
                f"{message}"])
        try:
            server.sendmail(EMAIL_FROM, target, _message.encode('utf8'))
            server.quit()
        except:
            return 'Erro'
    
    return send_message()