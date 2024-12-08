FROM node:latest

# Entrar a la carpeta.
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copiar todo al contenedor que pusimos en WORKDIR.
COPY . . 

EXPOSE 3000

CMD ["node","app.js"]
