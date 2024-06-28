// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Voting {
    struct Candidate {
        uint256 voteCount;
    }

    mapping(string => Candidate) public candidates;
    mapping(address => bool) public voters;

    event Voted(string indexed candidateId, address indexed voter);

    function vote(string memory candidateId) public {
        require(!voters[msg.sender], "You have already voted.");

        voters[msg.sender] = true;
        candidates[candidateId].voteCount++;

        emit Voted(candidateId, msg.sender);
    }

    function getVoteCount(
        string memory candidateId
    ) public view returns (uint256) {
        return candidates[candidateId].voteCount;
    }
}
