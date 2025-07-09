# Usamos alpine para imagen ligera
FROM node:20-alpine

# Establecemos directorio de trabajo
WORKDIR /app

# Copiar solo los archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Copiar y dar permisos al script de entrada
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Puerto que usará Vite
EXPOSE 3000

# Definir el punto de entrada
ENTRYPOINT ["/app/entrypoint.sh"]

# Comando por defecto que se pasará al entrypoint
CMD ["npm", "run", "dev"]