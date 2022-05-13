import { Entity, PrimaryColumn, Column , CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity('user')
export default class UserEntities  {
    @PrimaryColumn({ name:"_uid" , length: 15 })
    _uid?: string;

    @Column({ length:255,nullable:true })
    name?: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt?: Date;

    @Column({ length: 100, nullable: true })
    createdBy?: string;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt?: Date;

    @Column({ length: 100, nullable: true })
    updatedBy?: string;

    @Column({ type: "timestamp", nullable: true })
    deletedAt?: Date;
}