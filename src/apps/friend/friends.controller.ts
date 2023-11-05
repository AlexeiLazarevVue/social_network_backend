import {Body, Controller, Delete, Get, Param, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from "../user/user.guard";
import {FriendRequestDTO, GetFriendsDTO} from "./friend.dto";
import {FriendsService} from "./friends.service";

@Controller('/friends')
export class FriendsController {
    constructor(
        private friendService: FriendsService
    ) {
    }

    @UseGuards(AuthGuard)
    @Post('/requests/send')
    async sendFriendRequest(@Request() request, @Body() addFriendRequestDTO: FriendRequestDTO) {
        const friend = await this.friendService.addFriendRequest(request, addFriendRequestDTO)
    }

    @UseGuards(AuthGuard)
    @Post('/requests/accept/:friendRequestId')
    async acceptFriendRequest(@Request() request, @Param('friendRequestId') friendRequestId) {
      const addedFriend = await  this.friendService.addFriend(request, friendRequestId)
      const deletedRequest = await  this.friendService.deleteFriendRequest(friendRequestId)
    }

    @Delete('/requests/reject/:friendRequestId/')
    async rejectFriendRequest(@Param('friendRequestId') friendRequestId) {
        const deletedRequest = await  this.friendService.deleteFriendRequest(friendRequestId)
    }

    @Delete('/requests/retract/:friendRequestId/')
    async retractFriendRequest(@Param('friendRequestId') friendRequestId) {
        const deletedRequest = await  this.friendService.deleteFriendRequest(friendRequestId)
    }

    @Get('/of/:userId')
    async getFriendsOf(@Param('userId') userId: number) {
        const friends = await this.friendService.getFriendsOf(userId)

        return friends
    }

    @Get('/requests/list/of/:userId')
    async getFriendRequests(@Param('userId') userId: number) {
        const friendRequests = await this.friendService.getFriendRequestsOf(userId)

        return friendRequests
    }

}
