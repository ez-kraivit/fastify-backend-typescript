import { DataSource } from "typeorm";

import RoomJoinEntities from "../entities/RoomJoin.Entities";

export default class RoomTransactions {
    private manager: DataSource
    
    constructor(dataSource: DataSource) {        
        this.manager = dataSource;      
    }

    async getAdd(user: RoomJoinEntities){
        return await this.manager.transaction(async (transactionalManager:any) => {
            const currentData = await transactionalManager.find(RoomJoinEntities,{ where:{_uid:user?._uid,status:true} });
            if(!currentData.length){
                await transactionalManager.insert(RoomJoinEntities,user)
                return true
            }else{
                return false
            }    
        }).then((data)=>{
            return data
        })
    }

}