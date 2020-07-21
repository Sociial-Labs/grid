// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.7.0;

contract Graph {
    event Followed(address child, address parent);
    event Unfollowed(address child, address parent);
    event FollowerDeleted(address parent, address child);

    mapping(address => mapping(address => bool)) followedBy;
    mapping(address => mapping(address => bool)) following;
    mapping(address => uint32) followerCount;

    function follow(address parent) public {
        following[msg.sender][parent] = true;
        followedBy[parent][msg.sender] = true;
        followerCount[parent]++;
        emit Followed(msg.sender, parent);
    }

    function unfollow(address parent) public {
        following[msg.sender][parent] = false;
        followedBy[parent][msg.sender] = false;
        followerCount[parent]--;
        emit Unfollowed(msg.sender, parent);
    }

    function deleteFollower(address child) public {
        followedBy[msg.sender][child] = false;
        following[child][msg.sender] = false;
        followerCount[msg.sender]--;
        emit FollowerDeleted(msg.sender, child);
    }
}
