# Usa una imagen base de Node.js
FROM node:18-alpine

# Crea el directorio de la aplicación
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto
EXPOSE 3002

# Comando para iniciar la aplicación
CMD [ "node", "server.js" ]
