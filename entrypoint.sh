#!/bin/sh
# entrypoint.sh

# Salir inmediatamente si un comando falla
set -e

# Generar el CSS de Tailwind
echo "Entrypoint: Generando CSS de Tailwind..."
npm run build:css

# Ahora, ejecutar el comando principal que se pasó al contenedor
# (por ejemplo, "npm", "run", "dev")
echo "Entrypoint: Iniciando el proceso principal..."
exec "$@"
