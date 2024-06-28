// @generated by protoc-gen-connect-query v0.4.1 with parameter "target=ts"
// @generated from file post.proto (package post.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { createQueryService } from "@bufbuild/connect-query";
import { Empty, MethodKind } from "@bufbuild/protobuf";
import { CreateCommentRequest, DeleteCommentRequest, UpdateCommentRequest } from "./post_pb";

export const typeName = "post.v1.CommentService";

/**
 * コメント作成API
 *
 * @generated from rpc post.v1.CommentService.CreateComment
 */
export const createComment = createQueryService({
  service: {
    methods: {
      createComment: {
        name: "CreateComment",
        kind: MethodKind.Unary,
        I: CreateCommentRequest,
        O: Empty,
      },
    },
    typeName: "post.v1.CommentService",
  },
}).createComment;

/**
 * コメント更新API
 *
 * @generated from rpc post.v1.CommentService.UpdateComment
 */
export const updateComment = createQueryService({
  service: {
    methods: {
      updateComment: {
        name: "UpdateComment",
        kind: MethodKind.Unary,
        I: UpdateCommentRequest,
        O: Empty,
      },
    },
    typeName: "post.v1.CommentService",
  },
}).updateComment;

/**
 * コメント削除API
 *
 * @generated from rpc post.v1.CommentService.DeleteComment
 */
export const deleteComment = createQueryService({
  service: {
    methods: {
      deleteComment: {
        name: "DeleteComment",
        kind: MethodKind.Unary,
        I: DeleteCommentRequest,
        O: Empty,
      },
    },
    typeName: "post.v1.CommentService",
  },
}).deleteComment;
