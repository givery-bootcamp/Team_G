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

	"backend/domain"
	postv1 "backend/gen/post/v1"        // generated by protoc-gen-connect-go
	"backend/gen/post/v1/postv1connect" // generated by protoc-gen-connect-go

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type PostServer struct{}

// Connection URI
var uri = os.Getenv("MONGODB_URI")

func convertPostList(postlist []domain.Post) []*postv1.PostData {
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
		log.Fatalf("MongoDB接続エラー: %v", err)
		return nil, connect.NewError(connect.CodeInternal, err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			log.Fatalf("MongoDB切断エラー: %v", err)
		}
	}()

	coll := client.Database("SNS").Collection("Post")

	idStr := req.Msg.Id
	id, err := primitive.ObjectIDFromHex(idStr)
	if err != nil {
		log.Printf("ID変換エラー: %v", err)
		return nil, connect.NewError(connect.CodeInvalidArgument, err)
	}

	filter := bson.M{"_id": id}
	var result domain.Post
	err = coll.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, connect.NewError(connect.CodeNotFound, err)
		}
		log.Printf("ドキュメント取得エラー: %v", err)
		return nil, connect.NewError(connect.CodeInternal, err)
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
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatalf("MongoDB接続エラー: %v", err)
		return nil, connect.NewError(connect.CodeInternal, err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			log.Fatalf("MongoDB切断エラー: %v", err)
		}
	}()

	coll := client.Database("SNS").Collection("Post")

	cur, err := coll.Find(context.TODO(), bson.D{{}})
	if err != nil {
		log.Printf("ドキュメント検索エラー: %v", err)
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	var postList []domain.Post
	for cur.Next(context.TODO()) {
		var post domain.Post
		if err := cur.Decode(&post); err != nil {
			log.Printf("ドキュメントデコードエラー: %v", err)
			continue
		}
		postList = append(postList, post)
	}

	if err := cur.Err(); err != nil {
		log.Printf("カーソルエラー: %v", err)
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	res := connect.NewResponse(&postv1.PostListResponse{
		Post: convertPostList(postList),
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

	// CORS設定用ミドルウェア
	corsMiddleware := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusOK)
				return
			}

			next.ServeHTTP(w, r)
		})
	}

	log.Printf("Server listening on port %s", port)
	err := http.ListenAndServe(
		fmt.Sprintf("0.0.0.0:%s", port),
		h2c.NewHandler(corsMiddleware(mux), &http2.Server{}),
	)

	if err != nil {
		log.Fatalf("サーバーの起動に失敗しました: %v", err)
	}
}
