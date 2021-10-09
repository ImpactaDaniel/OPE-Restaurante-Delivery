FROM python:3.8-slim-buster

WORKDIR /

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

ENTRYPOINT [ "bash" ] 

ENV FLASK_APP ./delivery.py
ENV FLASK_ENV development

EXPOSE 5000

CMD ["./start.sh", "flask", "run", "--host=127.0.0.1"]
