# Usamos alpine para imagen ligera
FROM node:20-alpine

# Instalamos herramientas necesarias para compilar dependencias nativas
RUN apk add --no-cache build-base python3

# Establecemos directorio de trabajo
WORKDIR /app

# Copiamos package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Puerto que usará Vite o React (ajusta si usas otro puerto)
EXPOSE 5173

# Comando por defecto para desarrollo
CMD ["npm", "run", "dev", "--", "--host"]
