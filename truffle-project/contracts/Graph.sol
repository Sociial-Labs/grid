// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.7.0;

contract Graph {
    event Followed(uint id, address child, address parent);
    event Unfollowed(uint id, address child, address parent);
    event FollowerDeleted(uint id, address parent, address child);

    mapping(address => mapping(address => bool)) public followedBy;
    mapping(address => mapping(address => bool)) public following;
    mapping(address => uint32) public followerCount;

    uint256 private idCounter;

    constructor() public {
       idCounter = 0;
    }

    function follow(address parent) public {
        following[msg.sender][parent] = true;
        followedBy[parent][msg.sender] = true;
        followerCount[parent]++;
        idCounter++;
        emit Followed(idCounter, msg.sender, parent);
    }

    function unfollow(address parent) public {
        following[msg.sender][parent] = false;
        followedBy[parent][msg.sender] = false;
        followerCount[parent]--;
        idCounter++;
        emit Unfollowed(idCounter, msg.sender, parent);
    }

    function deleteFollower(address child) public {
        followedBy[msg.sender][child] = false;
        following[child][msg.sender] = false;
        followerCount[msg.sender]--;
        idCounter++;
        emit FollowerDeleted(idCounter, msg.sender, child);
    }

    function isFollowedBy(address parent, address child) public view returns (bool) {
        return followedBy[parent][child];
    }
}
