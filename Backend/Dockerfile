# Stage 1
# Start with a Maven include JDK21 image
FROM maven:3.9.9-amazoncorretto-21 AS build

# go to app folder, copy pom.xml & src into /app -> /app/pom.xml && /app/src
WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN mvn clean package

# Stage 2
# create image
# start with amazonCorretto-21 image
FROM amazoncorretto:21.0.4

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# Command to run application
ENTRYPOINT ["java", "-jar","app.jar"]
