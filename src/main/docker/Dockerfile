FROM java:8

# environment
EXPOSE 8080

# executable
ADD @project.artifactId@-@project.version@.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
