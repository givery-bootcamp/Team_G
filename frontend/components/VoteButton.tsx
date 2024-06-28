"use client";

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { Button } from "@/components/ui/button";
import { abi } from "@/constants/abi";
import { Spinner } from "@/components/Spinner";
import { toast } from "sonner";

const VoteButton = ({ postId }: { postId: string }) => {
  const { address } = useAccount();
  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  const handleVote = () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }
    writeContract({
      address: "0x2f3169fC572Df5eD5662AeC37d45aC17Cc30072F",
      abi,
      functionName: "vote",
      args: [postId],
    });
  };

  return (
    <Button onClick={handleVote} disabled={isConfirming}>
      {isConfirming ? "Voting..." : "Vote"}
      {isConfirming && <Spinner />}
    </Button>
  );
};

export default VoteButton;
