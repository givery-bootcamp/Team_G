import { createConnectTransport } from "@connectrpc/connect-web";
import { createPromiseClient } from "@connectrpc/connect";
import { PostService } from "@/gen/post_connect";

export const finalTransport = createConnectTransport({
  // gRPCのエンドポイントを指定する
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  useBinaryFormat: true,
});

// For SSR
export const postClient = createPromiseClient(PostService, finalTransport);
