package infra

import (
	"context"
	"log"

	"connectrpc.com/connect"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DB interface {
	New(uri string) (*mongo.Client, *connect.Error)
}

// type client interface {
// 	GetPost(id string) (*domain.Post, *connect.Error)
// 	GetPosts() ([]domain.Post, *connect.Error)
// }

func NewMongoDB(uri string) (*mongo.Client, error) {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatalf("MongoDB接続エラー: %v", err)
		return nil, err
	}
	return client, nil
}
