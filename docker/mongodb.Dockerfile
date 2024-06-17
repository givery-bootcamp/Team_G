FROM mongo:latest

ENV TZ="Asia/Tokyo"
RUN echo $TZ > /etc/timezone

COPY ./docker/mongo-init.js /docker-entrypoint-initdb.d/mongo-init.js
COPY ./docker/mongod.conf /etc/mongod.conf

EXPOSE 27017

ENTRYPOINT ["mongod"]