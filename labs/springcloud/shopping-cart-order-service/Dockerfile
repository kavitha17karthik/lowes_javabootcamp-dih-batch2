FROM openjdk:8-jre-alpine
LABEL version="1.0"
LABEL description="Order Service Image"
COPY ./target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8093