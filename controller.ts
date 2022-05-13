

import { FastifyRequest, FastifyReply, FastifyLoggerInstance } from "fastify";


import UserRepository from "./repository/User.Repository"
import RoomJoinRepository from "./repository/RoomJoin.Repository"
import RoomRepository from "./repository/Room.Repository"

import RoomTransactions from "./transactions/Room.Transactions"

import { Main } from "./main"
import RandomId from "./plugins/RandomId"
import Room from "./mockup/room.json"
import RoomJoinEntities from "./entities/RoomJoin.Entities";

type TUserName = {name:string,_uid:string}
type TRoomName = {_rid?:string,_rjid?:string,_uid?:string,topic?:string, description?:string, tags?:string[], isPublic?:boolean}
type TParams = {_eid?:string|undefined}


export class Controller {
    /** User Controller */
    static async userGet(request:FastifyRequest<{ Querystring: {page:number}; }>,h:FastifyReply){
        const currentData = await new UserRepository(Main.dataSource).getLists(<number>request.query.page)
        return currentData
    }
    static async userPost(request: FastifyRequest<{ Body: TUserName; }>,h:FastifyReply){
        try {
            request.body._uid = `${RandomId.generateid('base62', 15)}`
            await new UserRepository(Main.dataSource).insert(request.body)
            const message = { message: 'Insert User Success!', error: null }
            return message
        } catch (error) {
            console.info(error)
            const message = { message: 'Insert User Fail!', error: `${error}` }
            return message
        }
    }
    static async userPut(request: FastifyRequest<{ Body: TUserName; }>,h:FastifyReply){
        try {
            await new UserRepository(Main.dataSource).update(request.body)
            const message = { message: 'Update User Success!', error: null }
            return message
        } catch (error) {
            console.info(error)
            const message = { message: 'Update User Fail!', error: `${error}` }
            return message
        }
    }
    static async userDelete(request:FastifyRequest<{ Params: TParams }>,h:FastifyReply){
        try {
            await new UserRepository(Main.dataSource).update(<{[I:string]:string|boolean}>{ _eid: request.params._eid, is_delete: true })
            const message = { message: 'Delete User Success!', error: null }
            return message
        } catch (error) {
            console.info(error)
            const message = { message: 'Delete User Fail!', error: `${error}` }
            return message
        }
    }

    /** Room Join Controller */
    static async roomJoinPost(request:FastifyRequest<{ Body: TRoomName; }>,h:FastifyReply){
        try {            
            request.body._rjid = `${RandomId.generateid('base62', 15)}`
            const currentData =  await new RoomTransactions(Main.dataSource).getAdd(<RoomJoinEntities>request.body)
            const message = { message: currentData ? 'สามารถเข้าห้องได้' : null, error: !currentData ? 'ท่านต้องออกจากห้องเดิมก่อน' : null }
            return message
        } catch (error) {
            console.info(error)
            const message = { message: 'Insert Room Join Fail!', error: `${error}` }
            return message
        }
    }

    /** Room Controller */
    static async roomGet(request:FastifyRequest<{ Querystring: {page:number}; }>,h:FastifyReply){
        const currentData = await new RoomRepository(Main.dataSource).getLists(<number>request.query.page)
        return currentData
    }
    static async roomPost(request:FastifyRequest<{ Body: TRoomName; }>,h:FastifyReply){
        try {
            request.body._rid = `${RandomId.generateid('base62', 15)}`
            await new RoomRepository(Main.dataSource).insert(request.body)
            const message = { message: 'Insert Room Success!', error: null }
            return message
        } catch (error) {
            console.info(error)
            const message = { message: 'Insert Room Fail!', error: `${error}` }
            return message
        }
    }
    static async roomPostAuto(request:FastifyRequest<{ Body: TRoomName; }>,h:FastifyReply){
        try {
            request.body.topic = Room.topic;
            request.body.description = Room.description;
            request.body.tags = Room.tags;
            request.body.isPublic = Room.isPublic;
            request.body._rid = `${RandomId.generateid('base62', 15)}`;
            await new RoomRepository(Main.dataSource).insert(request.body)
            const message = { message: 'Insert Room Success!', error: null }
            return message
        } catch (error) {
            console.info(error)
            const message = { message: 'Insert Room Fail!', error: `${error}` }
            return message
        }
    }
    static async roomPut(request:FastifyRequest<{ Body: TRoomName; }>,h:FastifyReply){
        try {
            await new RoomRepository(Main.dataSource).update(<{ [key: string]: string | boolean }>request.body)
            const message = { message: 'Update Room Success!', error: null }
            return message
        } catch (error) {
            console.info(error)
            const message = { message: 'Update Room Fail!', error: `${error}` }
            return message
        }
    }
    static async roomDelete(request:FastifyRequest<{ Params: TParams }>,h:FastifyReply){
        try {
            await new RoomRepository(Main.dataSource).update(<{[I:string]:string|boolean}>{ _eid: request.params._eid, is_delete: true })
            const message = { message: 'Delete Room Success!', error: null }
            return message
        } catch (error) {
            console.info(error)
            const message = { message: 'Delete Room Fail!', error: `${error}` }
            return message
        }
    }

}