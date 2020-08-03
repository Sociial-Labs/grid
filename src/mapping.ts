import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  Followed,
  FollowerDeleted,
  Unfollowed
} from "../generated/Contract/Contract"
import { Follow, Unfollow, DeleteFollow } from "../generated/schema"

export function handleFollowed(event: Followed): void {
  let id = event.params.id.toHex();
  let follow = new Follow(id);
  follow.parent = event.params.parent;
  follow.child = event.params.child;
  follow.save()
}

export function handleFollowerDeleted(event: FollowerDeleted): void {
  let id = event.params.id.toHex();
  let deleteFollow = new DeleteFollow(id);
  deleteFollow.parent = event.params.parent;
  deleteFollow.child = event.params.child;
  deleteFollow.save()
}

export function handleUnfollowed(event: Unfollowed): void {
  let id = event.params.id.toHex();
  let unfollow = new Unfollow(id);
  unfollow.parent = event.params.parent;
  unfollow.child = event.params.child;
  unfollow.save()
}
