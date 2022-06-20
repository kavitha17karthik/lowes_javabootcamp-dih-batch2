FROM openjdk:8-jre-alpine
LABEL version="1.0"
LABEL description="Admin Service Image"
COPY ./target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 7777