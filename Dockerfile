# Usa la imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código al contenedor
COPY . .


#Genrar el resto del código al contenedor
RUN npx prisma generate



# Expone el puerto que usará la aplicación
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "run", "start"]

