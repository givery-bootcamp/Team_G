// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Voting} from "../src/Voting.sol";

contract VotingTest is Test {
    Voting public voting;

    function setUp() public {
        voting = new Voting();
    }

    function testAddCandidate() public {
        voting.addCandidate("Alice");
        (string memory name, uint256 voteCount) = voting.getCandidate(1);
        assertEq(name, "Alice");
        assertEq(voteCount, 0);
    }

    function testVote() public {
        voting.addCandidate("Alice");
        voting.vote(1);
        (, uint256 voteCount) = voting.getCandidate(1);
        assertEq(voteCount, 1);
    }

    function testFailDoubleVote() public {
        voting.addCandidate("Alice");
        voting.vote(1);
        voting.vote(1); // This should fail
    }

    function testFailVoteInvalidCandidate() public {
        voting.vote(1); // This should fail as no candidates are added
    }

    function testGetCandidate() public {
        voting.addCandidate("Alice");
        (string memory name, uint256 voteCount) = voting.getCandidate(1);
        assertEq(name, "Alice");
        assertEq(voteCount, 0);
    }

    function testGetAllCandidates() public {
        voting.addCandidate("Alice");
        voting.addCandidate("Bob");
        Voting.Candidate[] memory candidates = voting.getAllCandidates();
        assertEq(candidates.length, 2);
        assertEq(candidates[0].name, "Alice");
        assertEq(candidates[1].name, "Bob");
    }
}
