# CMD ["rm", "-rf", "/data/db/mongod.lock", "&&", "mongod", "--repair", "&&", "mongod", "--bind_ip", "0.0.0.0"] を列挙
rm -rf /data/db/mongod.lock /data/db/WiredTiger.lock && mongod --repair && mongod --bind_ip 0.0.0.0