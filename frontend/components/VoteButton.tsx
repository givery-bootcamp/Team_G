"use client";

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance, useReadContract } from "wagmi";
import { Button } from "@/components/ui/button";
import { abi } from "@/constants/abi";
import { Spinner } from "@/components/Spinner";
import { toast } from "sonner";
import { useEffect } from "react";

const CONTRACT_ADDRESS = "0x2f3169fC572Df5eD5662AeC37d45aC17Cc30072F";

const VoteButton = ({ postId }: { postId: string }) => {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: voteCount } = useReadContract({
    abi,
    address: CONTRACT_ADDRESS,
    functionName: "getVoteCount",
    args: [postId],
  });

  const { data: hash, writeContract } = useWriteContract();
  const {
    data: receipt,
    isLoading: isConfirming,
    isSuccess,
    isError,
    failureReason,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (receipt) {
      toast.success("Voted successfully");
      console.log("receipt", receipt);
    }
    if (isError && failureReason) {
      toast.error("すでに投票しています");
    }
  }, [isSuccess, receipt, failureReason, isError]);

  const handleVote = () => {
    if (!address) {
      toast.error("ウォレットを接続してください");
      return;
    }

    if (balance?.value === BigInt(0)) {
      toast.info("金欠みたいだから https://docs.base.org/docs/tools/network-faucets/ からここでETHをゲットしてみてね");
      return;
    }

    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "vote",
        args: [postId],
      });
    } catch (error) {
      toast.error("エラーが発生しました");
    }
  };

  return (
    <>
      <Button onClick={handleVote} disabled={isConfirming && !isError}>
        {isConfirming ? "Voting..." : isError ? "Vote failed" : "Vote"}
        {isConfirming && <Spinner />}
      </Button>
      <p className="font-bold">投票数: {voteCount?.toString() ?? 0}</p>
    </>
  );
};

export default VoteButton;
