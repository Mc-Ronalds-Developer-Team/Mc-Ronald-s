# Etapa 1: Construcción (Build)
FROM node:20-alpine as builder
WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código y construimos
COPY . .
RUN npm run build

# Etapa 2: Servidor Web
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

# --- NUEVA LÍNEA PARA CORREGIR REACT ROUTER ---
COPY nginx.conf /etc/nginx/conf.d/default.conf
# ----------------------------------------------

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]