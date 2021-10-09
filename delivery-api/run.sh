#!/bin/bash
echo "Buildando..."

docker build -t api .

echo "Rodando app..."

docker run -d -p 5000:80 api

echo "App rodando!"
