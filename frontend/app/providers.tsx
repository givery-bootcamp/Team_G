"use client";
import { PropsWithChildren } from "react";
import { createConnectTransport } from "@connectrpc/connect-web";
import { TransportProvider } from "@connectrpc/connect-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const finalTransport = createConnectTransport({
  //gRPCのエンドポイントを指定する
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
});
const queryClient = new QueryClient();

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TransportProvider transport={finalTransport}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TransportProvider>
  );
};
export default Providers;
