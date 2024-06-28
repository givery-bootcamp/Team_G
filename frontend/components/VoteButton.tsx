"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { Button } from "./ui/button";
import { abi } from "@/constants/abi";
import { Spinner } from "./Spinner";

const VoteButton = () => {
  const { address } = useAccount();
  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  if (!address) return <ConnectButton />;

  const handleVote = () => {
    writeContract({
      address: "0x7fCA9B5D1CFB005056029B05010bF25D265B16F2",
      abi,
      functionName: "vote",
      args: [BigInt(1)],
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
