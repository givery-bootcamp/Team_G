# gRPC と MongoDB 開発環境設定ガイド

## 目次

1. [開発の始め方（ローカル）](#開発の始め方ローカル)
   - [初期データ生成（初めのみ）](#初期データ生成初めのみ)
   - [MongoDB サービスの起動](#mongodb-サービスの起動)
   - [Protocol Buffers ファイルの生成](#protocol-buffers-ファイルの生成)
   - [サーバーの起動](#サーバーの起動)
   - [gRPC リクエストの送信](#grpc-リクエストの送信)
2. [grpcurl コマンド使用方法](#grpcurl-コマンド使用方法)
   - [投稿の一覧を取得](#投稿の一覧を取得)
   - [特定の投稿を取得](#特定の投稿を取得)
3. [MongoDB 関連ツールの使用方法](#mongodb-関連ツールの使用方法)
   - [MongoDB サービスの起動](#mongodb-サービスの起動-1)
   - [MongoDB シェルの起動](#mongodb-シェルの起動)
   - [MongoDB サービスの停止](#mongodb-サービスの停止)
4. [MongoDB シェル内のコマンド](#mongodb-シェル内のコマンド)
   - [SNS データベースの作成および使用](#sns-データベースの作成および使用)
   - [データの挿入](#データの挿入)
   - [データの削除](#データの削除)
   - [データの検索](#データの検索)
5. [Go 言語関連ツールのインストール](#go-言語関連ツールのインストール)
   - [buf: プロトコルバッファ管理ツール](#buf-プロトコルバッファ管理ツール)
   - [grpcurl: gRPC サービスと対話するツール](#grpcurl-grpc-サービスと対話するツール)
   - [protoc-gen-go: Protocol Buffers の Go 言語用プラグイン](#protoc-gen-go-protocol-buffers-の-go-言語用プラグイン)
   - [protoc-gen-connect-go: ConnectRPC の Go 言語用プラグイン](#protoc-gen-connect-go-connectrpc-の-go-言語用プラグイン)
6. [MongoDB 関連ツールのインストール](#mongodb-関連ツールのインストール)
   - [Homebrew タップの追加](#homebrew-タップの追加)
   - [MongoDB Community Edition のインストール](#mongodb-community-edition-のインストール)
7. [MongoDB 初期データの生成](#mongodb-初期データの生成)
   - [SNS データベースの作成および使用](#sns-データベースの作成および使用-1)
   - [初期データの挿入](#初期データの挿入)

## 開発の始め方（ローカル）

#### 初期データ生成（初めのみ）

[MongoDB 初期データの生成](#mongodb-初期データの生成)

#### MongoDB サービスの起動

```bash
brew services start mongodb/brew/mongodb-community
mongosh
```

#### Protocol Buffers ファイルの生成

```bash
buf generate
```

#### サーバーの起動

```bash
go run main.go
```

### ローカル環境

#### 投稿一覧取得

```bash
curl -X POST -H "Content-Type: application/json" -d '{}' http://localhost:80/post.v1.PostService/PostList
```

#### 投稿取得

```bash
curl -X POST -H "Content-Type: application/json" -d '{"id": "Object ID"}' http://localhost:80/post.v1.PostService/Post
```

#### 新規投稿

```bash
curl -X POST -H "Content-Type: application/json" -d '{
        "title": "Team 7 CreatePost Test",
        "body": "Team 7 CreatePost Test Body",
        "image_url": "https://avatars.githubusercontent.com/u/45951565?v=4"
}' http://localhost:80/post.v1.PostService/CreatePost
```

#### 投稿更新

```bash
curl -X POST -H "Content-Type: application/json" -d '{
	"id": "667a802a6e2d7b033265fb63",
	"title": "Asuma CreatePost Test222222222222222222222",
	"body": "Asuma CreatePost Test Body222222222222222222222"
}' http://localhost:80/post.v1.PostService/UpdatePost
```

#### 削除更新

```bash
curl -X POST -H "Content-Type: application/json" -d '{
        "id": "667a802a6e2d7b033265fb63"}' http://localhost:80/post.v1.PostService/DeletePost
```

### 本番環境

#### 投稿一覧取得

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Googleアクセストークン" -d '{}' http://localhost:80/post.v1.PostService/PostList
```

#### 投稿取得

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Googleアクセストークン" -d '{"id": "Object ID"}' http://localhost:80/post.v1.PostService/Post
```

#### 新規投稿

```bash
curl -X POST -H "Content-Type: application/json" -d '{
        "title": "Team 7 CreatePost Test",
        "body": "Team 7 CreatePost Test Body"
}' -H "Authorization: Googleアクセストークン" http://localhost:80/post.v1.PostService/CreatePost
```

#### 投稿更新

```bash
curl -X POST -H "Content-Type: application/json" -d '{
	"id": "667a802a6e2d7b033265fb63",
	"title": "Asuma CreatePost Test222222222222222222222",
	"body": "Asuma CreatePost Test Body222222222222222222222"
}' -H "Authorization: Googleアクセストークン" http://localhost:80/post.v1.PostService/UpdatePost
```

#### 削除更新

```bash
curl -X POST -H "Content-Type: application/json" -d '{
        "id": "667a802a6e2d7b033265fb63"}' -H "Authorization: Googleアクセストークン" http://localhost:80/post.v1.PostService/DeletePost
```

## grpcurl

#### 投稿の一覧を取得

```bash
grpcurl -protoset <(buf build -o -) -plaintext localhost:80 post.v1.PostService/PostList
```

```bash
grpcurl -protoset <(buf build -o -) team-7_bk.member0005.track-bootcamp.run:443 post.v1.PostService/PostList
```

#### 特定の投稿を取得

```bash
grpcurl -protoset <(buf build -o -) -plaintext -d '{"id": "6667bf839a410579d080476e"}' localhost:80 post.v1.PostService/Post
```

```bash
grpcurl -protoset <(buf build -o -) -d '{"id": "6667bf839a410579d080476e"}' team-7_bk.member0005.track-bootcamp.run:443 post.v1.PostService/Pos
```

## MongoDB 関連ツールの使用方法

#### MongoDB サービスの起動

```bash
brew services start mongodb/brew/mongodb-community
```

#### MongoDB シェルの起動

```bash
mongosh
```

#### MongoDB サービスの停止

```bash
 brew services stop mongodb/brew/mongodb-community
```

## MongoDB 　シェル内のコマンド

#### SNS データベースの作成および使用

```bash
use SNS
```

#### データの挿入

```bash
db.Post.insert({
  "title": "Hello, World!",
  "body": "This is a test post.",
  "user_id": 1,
  "comments": [],
  "created_at": {
    "seconds": 0,
    "nanos": 0
  },
  "updated_at": {
    "seconds": 0,
    "nanos": 0
  }
})
```

#### データの削除

```bash
db.Post.deleteMany({})
```

#### データの検索

```bash
db.Post.find()
```

## Go 言語関連ツールのインストール

開発に必要な Go 言語関連ツールをインストールする手順

#### buf: プロトコルバッファ管理ツール

```bash
go install github.com/bufbuild/buf/cmd/buf@latest
```

#### grpcurl: gRPC サービスと対話するツール

```bash
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest
```

#### protoc-gen-go: Protocol Buffers の Go 言語用プラグイン

```bash
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
```

#### protoc-gen-connect-go: ConnectRPC の Go 言語用プラグイン

```bash
go install connectrpc.com/connect/cmd/protoc-gen-connect-go@latest
```

## MongoDB 関連ツールのインストール

Homebrew を使用して MongoDB をインストールおよび設定する手順

#### Homebrew タップの追加

```bash
brew tap mongodb/brew
```

#### MongoDB Community Edition のインストール

```bash
brew install mongodb-community
```

## MongoDB 初期データの生成

MongoDB シェル内で初期データを生成する手順

#### SNS データベースの作成および使用

```bash
use SNS
```

#### 初期データの挿入

```bash
// 初期データの挿入①
db.Post.insert({
  "title": "Hello, World!",
  "body": "This is a test post.",
  "user_id": 1,
  "comments": [],
  "created_at": {
    "seconds": 0,
    "nanos": 0
  },
  "updated_at": {
    "seconds": 0,
    "nanos": 0
  }
})

// 初期データの挿入②
db.Post.insert({
  "title": "Hello, Hell!",
  "body": "This is a second test post.",
  "user_id": 2,
  "comments": [],
  "created_at": {
    "seconds": 0,
    "nanos": 0
  },
  "updated_at": {
    "seconds": 0,
    "nanos": 0
  }
})
```

### デプロイ

#### バックエンド

```bash
$ bash deploy-backend.sh タスクリビジョン番号
```

#### DB

```bash
$ cd docker
$ bash deploy-db.sh タスクリビジョン番号
```

[タスクリビジョン番号の確認](https://ap-northeast-1.console.aws.amazon.com/ecs/v2/task-definitions/dena-training-2024-team-7?status=ACTIVE&region=ap-northeast-1)

#### AWS でのデプロイ

Amazon Elastic Container Service
→ クラスター
→dena-training-2024
→ サービス
→dena-training-2024-team-7
→ デプロイ
→ サービスの更新
→ 新しいデプロイの強制

### ECS Target Group 変更

```bash
$ aws ecs update-service --cluster dena-training-2024 --service dena-training-2024-team-7 --load-balancers targetGroupArn=arn:aws:elasticloadbalancing:ap-northeast-1:101501319743:targetgroup/ecs-target-group-team-7-ex/14ce63dbe1e6d2eb,containerName=backend,containerPort=80
```
