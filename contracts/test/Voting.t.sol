// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Voting} from "../src/Voting.sol";

contract VotingTest is Test {
    Voting public voting;

    function setUp() public {
        voting = new Voting();
    }

    function testVote() public {
        voting.vote("1");
        uint256 voteCount = voting.getVoteCount("1");
        assertEq(voteCount, 1);
    }

    function testFailDoubleVote() public {
        voting.vote("1");
        voting.vote("1"); // This should fail
    }

    function testGetVoteCount() public {
        voting.vote("1");
        uint256 voteCount = voting.getVoteCount("1");
        assertEq(voteCount, 1);
    }
}
