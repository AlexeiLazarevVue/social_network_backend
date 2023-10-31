import "reflect-metadata"
import {DataSource} from "typeorm"
import {User} from "./entity/User"
import {UserToken} from "./entity/UserToken";
import {FriendRequest} from "./entity/FriendRequest";
import {Friend} from "./entity/Friend";

export const dataSource = new DataSource({
    type: "sqlite",
    entities: [User, UserToken, Friend, FriendRequest],
    database: 'db.sqlite3',
})
