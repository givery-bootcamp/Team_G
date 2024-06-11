# gcpcurl

```bash
grpcurl -protoset <(buf build -o -) -plaintext localhost:8080 post.v1.PostService/Post
```

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

## mongodb 関連ツール

```bash
# Homebrewタップの追加
brew tap mongodb/brew

# MongoDB Community Editionのインストール
brew install mongodb-community

# MongoDBサービスの起動
brew services start mongodb/brew/mongodb-community

# MongoDBシェルの起動
mongosh
```

## mongodb 初期データ生成

```bash
# mongodbシェル内

# SNSデータベースの作成/使用
use SNS

# 初期データの挿入①
db.Post.insert(
  {
   	"title" : "Hello, World!",
    "body" : "This is a test post.",
    "user_id" : 1,
    "comments" : [],
    "created_at": {
      "seconds": 0,
      "nanos": 0
    },
    "updated_at": {
      "seconds": 0,
      "nanos": 0
    }
  }
)

# 初期データの挿入②
db.Post.insert(
  {
   	"title" : "Hello, Hell!",
    "body" : "This is a second test post.",
    "user_id" : 2,
    "comments" : [],
    "created_at": {
      "seconds": 0,
      "nanos": 0
    },
    "updated_at": {
      "seconds": 0,
      "nanos": 0
    }
  }
)

# 削除
db.Post.deleteMany({})

# 検索
db.Post.find()
```
