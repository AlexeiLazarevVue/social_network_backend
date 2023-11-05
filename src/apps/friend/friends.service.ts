import { Injectable } from '@nestjs/common';
import {FriendRequestDTO} from "./friend.dto";
import {Friend} from "../../entity/Friend";
import {FriendRequest} from "../../entity/FriendRequest";

@Injectable()
export class FriendsService {
    async addFriendRequest(request, dto: FriendRequestDTO) {
        const friendRequest = new FriendRequest()

        friendRequest.targetUserId = dto.targetUserId
        friendRequest.fromUserId = request.user.id

        await friendRequest.save()
    }

    async deleteFriendRequest(friendRequestId) {
        const friendRequest = FriendRequest.delete({id: friendRequestId})
    }

    async addFriend(request, friendRequestId) {
        const firstFriendship = new Friend()
        const secondFriendship = new Friend()
        const friendRequest = await FriendRequest.findOneBy({id: friendRequestId})

        firstFriendship.targetUserId = friendRequest.targetUserId
        firstFriendship.userId = request.user.id

        firstFriendship.targetUserId = request.user.id
        firstFriendship.userId = friendRequest.targetUserId

        await firstFriendship.save()
        await secondFriendship.save()
    }

    async  getFriendsOf(userId: number) {
        const friends = await Friend.findBy({
            userId: userId
        })

        return friends
    }
    async  getFriendRequestsOf(userId: number) {
        const friendRequests = await FriendRequest.findBy({
            targetUserId: userId
        })

        return friendRequests
    }
}
