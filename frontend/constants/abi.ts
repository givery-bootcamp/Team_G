export const abi = [
  {
    type: "function",
    name: "candidates",
    inputs: [{ name: "", type: "string", internalType: "string" }],
    outputs: [{ name: "voteCount", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getVoteCount",
    inputs: [{ name: "candidateId", type: "string", internalType: "string" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "vote",
    inputs: [{ name: "candidateId", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "voters",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "Voted",
    inputs: [
      {
        name: "candidateId",
        type: "string",
        indexed: true,
        internalType: "string",
      },
      {
        name: "voter",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
] as const;
