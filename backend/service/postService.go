package service

import (
	"backend/domain"
	"backend/utils"
	"context"
	"fmt"
	"log"

	postv1 "backend/gen/post/v1" // generated by protoc-gen-connect-go

	"connectrpc.com/connect"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"google.golang.org/api/oauth2/v1"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type PostServer struct{}

// ------------------------------ Create ------------------------------

func (s *PostServer) CreatePost(
	ctx context.Context,
	req *connect.Request[postv1.CreatePostRequest],
) (*connect.Response[emptypb.Empty], error) {
	client, ok := ctx.Value(utils.ClientKey).(*mongo.Client)
	if !ok {
		log.Println("client取得エラー: CreatePost")
		return nil, connect.NewError(connect.CodeInternal, nil)
	}

	coll := client.Database("SNS").Collection("Post")

	// ユーザIDをコンテキストから取得
	user, ok := ctx.Value(utils.UserKey).(*oauth2.Userinfoplus)
	if !ok {
		log.Printf("ユーザー情報がありません")
	}

	post := domain.Post{
		Id:        primitive.NewObjectID(),
		Title:     req.Msg.Title,
		Body:      req.Msg.Body,
		UserId:    user.Id,
		UserName:  user.Name,
		ImageUrl:  req.Msg.ImageUrl,
		Comments:  []domain.Comment{},
		CreatedAt: domain.Timestamp{Seconds: timestamppb.Now().GetSeconds(), Nanos: timestamppb.Now().GetNanos()},
		UpdatedAt: domain.Timestamp{Seconds: timestamppb.Now().GetSeconds(), Nanos: timestamppb.Now().GetNanos()},
	}

	_, err := coll.InsertOne(context.TODO(), post)
	if err != nil {
		log.Printf("ドキュメント挿入エラー: %v", err)
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(&emptypb.Empty{}), nil
}

// ------------------------------ Read ------------------------------

func (s *PostServer) Post(
	ctx context.Context,
	req *connect.Request[postv1.PostRequest],
) (*connect.Response[postv1.PostResponse], error) {
	client, ok := ctx.Value(utils.ClientKey).(*mongo.Client)
	if !ok {
		log.Println("client取得エラー: Post")
		return nil, connect.NewError(connect.CodeInternal, nil)
	}

	// client
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

	comments := []*postv1.Comment{}
	for _, comment := range result.Comments {
		comments = append(comments, &postv1.Comment{
			Id:        comment.Id.Hex(),
			Body:      comment.Body,
			UserName:  comment.UserName,
			UserId:    comment.UserId,
			CreatedAt: &timestamppb.Timestamp{Seconds: comment.CreatedAt.Seconds, Nanos: comment.CreatedAt.Nanos},
			UpdatedAt: &timestamppb.Timestamp{Seconds: comment.UpdatedAt.Seconds, Nanos: comment.UpdatedAt.Nanos},
		})
	}

	res := connect.NewResponse(&postv1.PostResponse{
		Post: &postv1.PostData{
			Id:        result.Id.Hex(),
			Title:     result.Title,
			Body:      result.Body,
			UserName:  result.UserName,
			UserId:    result.UserId,
			ImageUrl:  result.ImageUrl,
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
	client, ok := ctx.Value(utils.ClientKey).(*mongo.Client)
	if !ok {
		log.Println("client取得エラー: PostList")
		return nil, connect.NewError(connect.CodeInternal, nil)
	}

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
		Post: utils.ConvertPostList(postList),
	})
	return res, nil
}

// ------------------------------ Update ------------------------------

func (s *PostServer) UpdatePost(
	ctx context.Context,
	req *connect.Request[postv1.UpdatePostRequest],
) (*connect.Response[emptypb.Empty], error) {
	client, ok := ctx.Value(utils.ClientKey).(*mongo.Client)
	if !ok {
		log.Println("client取得エラー: UpdatePost")
		return nil, connect.NewError(connect.CodeInternal, nil)
	}

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

	user, ok := ctx.Value(utils.UserKey).(*oauth2.Userinfoplus)
	if !ok {
		log.Printf("ユーザー情報がありません")
	}
	userID := user.Id

	if result.UserId != userID {
		return nil, connect.NewError(connect.CodePermissionDenied, fmt.Errorf("権限がありません"))
	}

	// リクエストの値が空の場合
	if req.Msg.Title == "" || req.Msg.Body == "" {
		return nil, connect.NewError(connect.CodeInvalidArgument, fmt.Errorf("タイトルまたは本文が空です"))
	}

	update := bson.M{
		"$set": bson.M{
			"title":      req.Msg.Title,
			"body":       req.Msg.Body,
			"image_url":  req.Msg.ImageUrl,
			"updated_at": domain.Timestamp{Seconds: timestamppb.Now().GetSeconds(), Nanos: timestamppb.Now().GetNanos()},
		},
	}

	_, err = coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Printf("ドキュメント更新エラー: %v", err)
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(&emptypb.Empty{}), nil
}

func (s *PostServer) DeletePost(
	ctx context.Context,
	req *connect.Request[postv1.DeletePostRequest],
) (*connect.Response[emptypb.Empty], error) {
	client, ok := ctx.Value(utils.ClientKey).(*mongo.Client)
	if !ok {
		log.Println("client取得エラー: DeletePost")
		return nil, connect.NewError(connect.CodeInternal, nil)
	}

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

	user, ok := ctx.Value(utils.UserKey).(*oauth2.Userinfoplus)
	if !ok {
		log.Printf("ユーザー情報がありません")
	}
	userID := user.Id

	if result.UserId != userID {
		return nil, connect.NewError(connect.CodePermissionDenied, fmt.Errorf("権限がありません"))
	}

	_, err = coll.DeleteOne(context.TODO(), filter)
	if err != nil {
		log.Printf("ドキュメント削除エラー: %v", err)
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(&emptypb.Empty{}), nil
}
