import { baseSepolia } from "wagmi/chains";

import { createPublicClient, http } from "viem";
import { abi } from "@/constants/abi";

export const publicClient = () =>
  createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

export const getVoteCount = async (postId: string) => {
  return await publicClient().readContract({
    address: "0x2f3169fC572Df5eD5662AeC37d45aC17Cc30072F",
    abi,
    functionName: "getVoteCount",
    args: [postId],
  });
};
