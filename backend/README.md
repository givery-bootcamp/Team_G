# 開発環境ツールのインストール方法

## Go 言語関連ツール

```bash
# buf: プロトコルバッファを管理するためのツール
go install github.com/bufbuild/buf/cmd/buf@latest

# grpcurl: gRPCサービスと対話するための便利なツール
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest

# protoc-gen-go: Protocol BuffersのGo言語用プラグイン
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest

# protoc-gen-connect-go: ConnectRPCのGo言語用プラグイン
go install connectrpc.com/connect/cmd/protoc-gen-connect-go@latest
```
