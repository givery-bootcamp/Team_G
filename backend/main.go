package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"connectrpc.com/connect"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"

	postv1 "backend/gen/post/v1"        // generated by protoc-gen-connect-go
	"backend/gen/post/v1/postv1connect" // generated by protoc-gen-connect-go

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type PostServer struct{}

// Connection URI
const uri = "mongodb://db:27017"

type Post struct {
	Id        primitive.ObjectID `bson:"_id"`
	Title     string             `bson:"title"`
	Body      string             `bson:"body"`
	UserId    int32              `bson:"user_id"`
	Comments  []Comment          `bson:"comments"`
	CreatedAt Timestamp          `bson:"created_at"`
	UpdatedAt Timestamp          `bson:"updated_at"`
}

type Comment struct {
	Id        primitive.ObjectID `bson:"_id"`
	Body      string             `bson:"body"`
	UserId    int32              `bson:"user_id"`
	PostId    int32              `bson:"post_id"`
	CreatedAt Timestamp          `bson:"created_at"`
	UpdatedAt Timestamp          `bson:"updated_at"`
}

type Timestamp struct {
	Seconds int64 `bson:"seconds"`
	Nanos   int32 `bson:"nanos"`
}

func convertPostList(postlist []Post) []*postv1.PostData {
	var res []*postv1.PostData
	for _, post := range postlist {
		comments := []*postv1.Comment{}
		for _, comment := range post.Comments {
			comments = append(comments, &postv1.Comment{
				Id:        comment.Id.Hex(),
				Body:      comment.Body,
				UserId:    comment.UserId,
				PostId:    comment.PostId,
				CreatedAt: &timestamppb.Timestamp{Seconds: comment.CreatedAt.Seconds, Nanos: comment.CreatedAt.Nanos},
				UpdatedAt: &timestamppb.Timestamp{Seconds: comment.UpdatedAt.Seconds, Nanos: comment.UpdatedAt.Nanos},
			})
		}
		res = append(res, &postv1.PostData{
			Id:        post.Id.Hex(),
			Title:     post.Title,
			Body:      post.Body,
			UserId:    post.UserId,
			Comments:  comments,
			CreatedAt: &timestamppb.Timestamp{Seconds: post.CreatedAt.Seconds, Nanos: post.CreatedAt.Nanos},
			UpdatedAt: &timestamppb.Timestamp{Seconds: post.UpdatedAt.Seconds, Nanos: post.UpdatedAt.Nanos},
		})
	}

	return res
}

func (s *PostServer) Post(
	ctx context.Context,
	req *connect.Request[postv1.PostRequest],
) (*connect.Response[postv1.PostResponse], error) {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))

	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	coll := client.Database("SNS").Collection("Post")

	// reqからIDを取り出す
	idStr := req.Msg.Id
	// 取り出したIDで検索
	id, err := primitive.ObjectIDFromHex(idStr)
	filter := bson.M{"_id": id}
	var result Post
	err = coll.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, err
		}
		panic(err)
	}

	fmt.Println(result)

	comments := []*postv1.Comment{}
	for _, comment := range result.Comments {
		comments = append(comments, &postv1.Comment{
			Id:        comment.Id.Hex(),
			Body:      comment.Body,
			UserId:    comment.UserId,
			PostId:    comment.PostId,
			CreatedAt: &timestamppb.Timestamp{Seconds: comment.CreatedAt.Seconds, Nanos: comment.CreatedAt.Nanos},
			UpdatedAt: &timestamppb.Timestamp{Seconds: comment.UpdatedAt.Seconds, Nanos: comment.UpdatedAt.Nanos},
		})
	}

	res := connect.NewResponse(&postv1.PostResponse{
		Post: &postv1.PostData{
			Id:        result.Id.Hex(),
			Title:     result.Title,
			Body:      result.Body,
			UserId:    result.UserId,
			Comments:  comments,
			CreatedAt: &timestamppb.Timestamp{Seconds: result.CreatedAt.Seconds, Nanos: result.CreatedAt.Nanos},
			UpdatedAt: &timestamppb.Timestamp{Seconds: result.UpdatedAt.Seconds, Nanos: result.UpdatedAt.Nanos},
		},
	})
	return res, nil
}

// json か バイナリ
func (s *PostServer) PostList(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[postv1.PostListResponse], error) {
	// log.Println("Request headers: ", req.Header())
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))

	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	coll := client.Database("SNS").Collection("Post")

	// filter := bson.D{{"<<fieldName>>", bson.D{{"$eq", "hoge"}}}}

	cur, err := coll.Find(context.TODO(), bson.D{{}})
	if err != nil {
		panic(err)
	}

	PostList := []Post{}

	for cur.Next(context.TODO()) {
		var res Post
		cur.Decode(&res)
		PostList = append(PostList, res)
	}

	res := connect.NewResponse(&postv1.PostListResponse{
		Post: convertPostList(PostList),
	})
	return res, nil
}

func main() {
	// PORT環境変数の値を取得
	port := os.Getenv("PORT")
	if port == "" {
		port = "80"
	}

	poster := &PostServer{}
	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Team 7 200 OK"))
	})

	path, handler := postv1connect.NewPostServiceHandler(poster)
	mux.Handle(path, handler)

	log.Printf("Server listening on port %s", port)
	err := http.ListenAndServe(
		fmt.Sprintf("0.0.0.0:%s", port),
		h2c.NewHandler(mux, &http2.Server{}),
	)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
}
