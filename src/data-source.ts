import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"


export const dataSource = new DataSource({
    type: "sqlite",
    entities: [User],
    database: 'db.sqlite3',
})
