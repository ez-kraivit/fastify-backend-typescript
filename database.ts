import UserEntities from "./entities/User.Entities"
import RoomEntities from "./entities/Room.Entities"
import RoomJoinEntities from "./entities/RoomJoin.Entities"

export const AppDataSource ={
    type: "postgres",
    host: "localhost",
    port: 5764,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    shcema:'public',
    synchronize: true,
    logging: false,
    entities: [UserEntities,RoomEntities,RoomJoinEntities],
    subscribers: [],
}