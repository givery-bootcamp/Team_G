"use client";

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance, useReadContract } from "wagmi";
import { Button } from "@/components/ui/button";
import { abi } from "@/constants/abi";
import { Spinner } from "@/components/Spinner";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const VoteButton = ({ postId }: { postId: string }) => {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: voteCount } = useReadContract({
    abi,
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    functionName: "getVoteCount",
    args: [postId],
  });

  const { data: hash, writeContract } = useWriteContract();
  const {
    data: receipt,
    isLoading: isConfirming,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const router = useRouter();

  useEffect(() => {
    if (receipt) {
      toast.success("Voted successfully");
      console.log("receipt", receipt);
      // router.refresh();
    }
  }, [isSuccess, router, receipt]);

  const handleVote = () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    if (balance?.value === BigInt(0)) {
      toast.info("Please visit and get faucet from https://docs.base.org/docs/tools/network-faucets/");
      return;
    }

    try {
      writeContract({
        address: "0x2f3169fC572Df5eD5662AeC37d45aC17Cc30072F",
        abi,
        functionName: "vote",
        args: [postId],
      });
    } catch (error) {
      toast.error("already voted");
    }
  };

  return (
    <>
      <Button onClick={handleVote} disabled={isConfirming || isSuccess}>
        {isConfirming ? "Voting..." : isSuccess ? "Voted" : "Vote"}
        {isConfirming && <Spinner />}
      </Button>
      <p>VOTE COUNT: {voteCount?.toString() ?? 0}</p>
    </>
  );
};

export default VoteButton;
