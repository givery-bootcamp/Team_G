FROM golang:1.22

WORKDIR /app
# 親の階層は見に行けない
COPY backend /app

# 権限付与
RUN GOOS=linux GOARCH=amd64 go build -o main main.go
RUN chmod +x /app/main

EXPOSE 80

# バイナリ指定
ENTRYPOINT ["./main"]
