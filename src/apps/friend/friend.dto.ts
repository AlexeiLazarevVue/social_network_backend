export class FriendRequestDTO {
    readonly targetUserId : number
    readonly message : string | null
}

// export class AddFriendDTO {
//     readonly targetUserId : number
// }

export class GetFriendsDTO {
    readonly targetUserId : number
}