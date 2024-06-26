package domain

import "go.mongodb.org/mongo-driver/bson/primitive"

type Post struct {
	Id        primitive.ObjectID `bson:"_id"`
	Title     string             `bson:"title"`
	Body      string             `bson:"body"`
	UserId    string             `bson:"user_id"`
	ImageUrl  string             `bson:"image_url"`
	Comments  []Comment          `bson:"comments"`
	CreatedAt Timestamp          `bson:"created_at"`
	UpdatedAt Timestamp          `bson:"updated_at"`
}

type Comment struct {
	Id        primitive.ObjectID `bson:"_id"`
	Body      string             `bson:"body"`
	UserId    string             `bson:"user_id"`
	PostId    string             `bson:"post_id"`
	CreatedAt Timestamp          `bson:"created_at"`
	UpdatedAt Timestamp          `bson:"updated_at"`
}

type Timestamp struct {
	Seconds int64 `bson:"seconds"`
	Nanos   int32 `bson:"nanos"`
}
