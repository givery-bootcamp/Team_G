// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Voting {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public voters;
    uint256 public candidatesCount;

    event Voted(uint256 indexed candidateId, address indexed voter);

    function addCandidate(string memory name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);
    }

    function vote(uint256 candidateId) public {
        require(!voters[msg.sender], "You have already voted.");
        require(
            candidateId > 0 && candidateId <= candidatesCount,
            "Invalid candidate ID."
        );

        voters[msg.sender] = true;
        candidates[candidateId].voteCount++;

        emit Voted(candidateId, msg.sender);
    }

    function getCandidate(
        uint256 candidateId
    ) public view returns (string memory name, uint256 voteCount) {
        require(
            candidateId > 0 && candidateId <= candidatesCount,
            "Invalid candidate ID."
        );
        Candidate memory candidate = candidates[candidateId];
        return (candidate.name, candidate.voteCount);
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidatesCount);
        for (uint256 i = 1; i <= candidatesCount; i++) {
            allCandidates[i - 1] = candidates[i];
        }
        return allCandidates;
    }
}
