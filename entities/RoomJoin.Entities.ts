import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn , ManyToOne, JoinColumn } from "typeorm";

import RoomEntities from "./Room.Entities";
import UserEntities from "./User.Entities";

@Entity('room_join')
export default class RoomJoinEntities  {
    @PrimaryColumn({ name:"_rjid", length:15 })
    _rjid?: string ;

    @ManyToOne(() => UserEntities , user => user._uid) @JoinColumn({ name: "_uid" , referencedColumnName: "_uid" })
    _uid?: UserEntities | null ;

    @ManyToOne(() => RoomEntities , room => room._rid) @JoinColumn({ name: "_rid" , referencedColumnName: "_rid" })
    _rid?: RoomEntities | null ;

    @Column({ name:'leader' , length:255})
    leader?: string ;

    @Column({  nullable: true , default: true })
    status?: boolean ; /** ผู้ใช้งานออกจากห้องหรือยัง */
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt?: Date ;

    @Column({ length: 100, nullable: true })
    createdBy?: string ;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt?: Date ;

    @Column({ length: 100, nullable: true })
    updatedBy?: string ;

    @Column({ type: "timestamp", nullable: true })
    deletedAt?: Date ;
}

