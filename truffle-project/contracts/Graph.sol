// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.7.0;

contract Graph {
    event FollowerAdded(address parent, address child);
    event FollowerDeleted(address child, address parent);
    event Following(address parent, address child);

    mapping(address => mapping(address => bool)) followedBy;
    mapping(address => mapping(address => bool)) following;
    mapping(address => uint32) followerCount;

    function addFollower(address child) public {
        followedBy[msg.sender][child] = true;
        emit FollowerAdded(msg.sender, child);
    }

    function follow(address parent) public {
        following[parent][msg.sender] = true;
        emit Following(msg.sender, parent);
    }

    function deleteFollower(address child) public {
        followedBy[msg.sender][child] = false;
        emit FollowerDeleted(msg.sender, child);
    }
}
