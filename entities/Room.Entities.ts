import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('room')
export default class RoomEntities  {    
    @PrimaryColumn({ name:"_rid", length:15 })
    _rid?: string ;

    @Column({ name:'topic' , length:255})
    topic?: string ;
    
    @Column({ type:'text',nullable: true})
    description?: string ;

    @Column({ type:'json', nullable: true })
    tags?: {[key: string]: any} ;

    @Column({ type: 'boolean',  default: true })
    isPublic?: boolean ;

    @Column({ name: "password",length:'255',nullable: true })
    password?: string ;

    @Column({ type: 'boolean',  default: false })
    isDelete?: boolean ; /** ลบห้องออกจากระบบ */

    @Column({  nullable: true , default: true })
    status?: boolean ; /** เปิดห้องล่วงหน้าแต่ยังไม่ให้ใช้งาน */
    
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

