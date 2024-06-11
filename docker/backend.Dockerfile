FROM golang:1.22

RUN mkdir /go/src/myapp
WORKDIR /go/src/myapp

# buf: プロトコルバッファを管理するためのツール
RUN go install github.com/bufbuild/buf/cmd/buf@latest

# grpcurl: gRPCサービスと対話するための便利なツール
RUN go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest

# protoc-gen-go: Protocol BuffersのGo言語用プラグイン
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@latest

# protoc-gen-connect-go: ConnectRPCのGo言語用プラグイン
RUN go install connectrpc.com/connect/cmd/protoc-gen-connect-go@latest

RUN go install github.com/cosmtrek/air@v1.51.0