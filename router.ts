import { DataSource } from "typeorm"

import { Main } from "./main"
import { Controller } from "./controller"

type TUserName = {name:string,_uid:string}
type TRoomName = {_rid?:string,_rjid?:string,_uid?:string,topic?:string, description?:string, tags?:string[], isPublic?:boolean}
type TParams = {_eid?:string}

export class Router {

    dataSource: DataSource;
    apiName: String  = '/api/v1'

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource
    }

    public async init(): Promise<void> {
        Main.app.get<{Querystring:{page:number}}>(`${this.apiName}/demo`,async (request, reply) => Controller.userGet(request,reply))


        Main.app.get<{Querystring:{page:number}}>(`${this.apiName}/user`,async (request, reply) => Controller.userGet(request,reply))
        Main.app.post<{Body:TUserName}>(`${this.apiName}/user`,async (request, reply) => Controller.userPost(request,reply))
        Main.app.put<{Body:TUserName}>(`${this.apiName}/user`,async (request, reply) => Controller.userPut(request,reply))
        Main.app.delete<{Params:TParams}>(`${this.apiName}/user`,async (request, reply) => Controller.userDelete(request,reply))

        Main.app.post<{Body:TRoomName}>(`${this.apiName}/room-join/add`,async (request, reply) => Controller.roomJoinPost(request,reply))

        Main.app.get<{Querystring:{page:number}}>(`${this.apiName}/room`,async (request, reply) => Controller.roomGet(request,reply))
        Main.app.post<{Body:TRoomName}>(`${this.apiName}/room/auto`,async (request, reply) => Controller.roomPostAuto(request,reply))
        Main.app.post<{Body:TRoomName}>(`${this.apiName}/room`,async (request, reply) => Controller.roomPost(request,reply))
        Main.app.put<{Body:TRoomName}>(`${this.apiName}/room`,async (request, reply) => Controller.roomPut(request,reply))
        Main.app.delete<{Params:TParams}>(`${this.apiName}/room`,async (request, reply) => Controller.roomDelete(request,reply))
    }
    
}