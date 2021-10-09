#!/bin/bash
echo "configurando API..."
# docker-compose exec -it api
flask shell "from app import db; db.create_all(); from app.models import Role; Role.insert_roles()"


echo "Concluido configuracao."