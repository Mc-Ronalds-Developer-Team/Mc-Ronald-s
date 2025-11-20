# 1. Usamos una imagen base con Java 21 (coincide con tu pom.xml)
FROM eclipse-temurin:21-jdk-alpine

# 2. Creamos la carpeta de trabajo
WORKDIR /app

# 3. Copiamos todo el contenido de tu carpeta back/McRonalds al contenedor
COPY . .

# 4. Damos permisos de ejecución al instalador de Maven (mvnw)
RUN chmod +x mvnw

# 5. Construimos la aplicación (saltando los tests para que sea más rápido ahora)
RUN ./mvnw clean package -DskipTests

# 6. Le decimos a Render que el puerto es el 8080
EXPOSE 8080

# 7. Comando para arrancar la app
# NOTA: Ajusta el nombre del .jar si cambia, pero por defecto Spring crea este nombre basado en tu pom.xml
ENTRYPOINT ["java", "-jar", "target/McRonalds-0.0.1-SNAPSHOT.jar"]