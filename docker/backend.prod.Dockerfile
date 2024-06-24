# ビルドステージ
FROM golang:1.22 AS builder

WORKDIR /app

# 必要なファイルをコピー
COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend ./

# バイナリをビルド
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main main.go

# 実行ステージ
FROM alpine:3.14

EXPOSE 80

WORKDIR /app

# ビルドしたバイナリをコピー
COPY --from=builder /app/main /app/main

# バイナリを実行
ENTRYPOINT ["./main"]