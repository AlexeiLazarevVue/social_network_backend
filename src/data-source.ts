import "reflect-metadata"
import {DataSource} from "typeorm"
import {User} from "./entity/User"
import {UserToken} from "./entity/UserToken";

export const dataSource = new DataSource({
    type: "sqlite",
    entities: [User, UserToken],
    database: 'db.sqlite3',
})
