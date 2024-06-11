FROM mongo:latest

#ENV MONGO_INITDB_ROOT_USERNAME root
#ENV MONGO_INITDB_ROOT_PASSWORD password
#ENV MONGO_INITDB_DATABASE app1

ENV TZ="Asia/Tokyo"
RUN echo $TZ > /etc/timezone

COPY mongo-init.js /docker-entrypoint-initdb.d/mongo-init.js
COPY mongod.conf /etc/mongod.conf