FROM mongo:latest

ENV TZ="Asia/Tokyo"
RUN echo $TZ > /etc/timezone

COPY ./docker/mongod_lock_renew.sh /mongod_lock_renew.sh
RUN chmod +x /mongod_lock_renew.sh

EXPOSE 27017

CMD ["sh", "mongod_lock_renew.sh"]