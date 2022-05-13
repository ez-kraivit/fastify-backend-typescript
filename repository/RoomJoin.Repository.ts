import { DataSource, Repository, ObjectLiteral } from "typeorm";
import RoomJoinMigration from "../entities/RoomJoin.Entities";

export default class RoomJoinRepository {
    private Repository: Repository<RoomJoinMigration> | ObjectLiteral;

    private manager: DataSource;

    constructor(dataSource: DataSource) {        
        this.manager = dataSource;      
        this.Repository = this.manager.getRepository(RoomJoinMigration);
    }

    async all(): Promise<RoomJoinMigration[]> {
        return await this.Repository.find({ where: { status:true } });
    }

    async getLists(page: number = 0, limit: number = 50): Promise<Object> {
        const [list, count] = await Promise.all([
            this.Repository.find({ where: { status:true }, take: limit, skip: page > 1 ? (page - 1) * limit : 0, order: { updatedAt: "DESC" } }),
            this.Repository.count({ where: { status:true }, order: { updatedAt: "DESC" } }),
        ]);
        return { list, count, page, pageSize: limit };
    }

    async get(id: string): Promise<RoomJoinMigration> {
        return this.Repository.findOne({ where: { id: id, status:true } });
    }

    async insert(request: { [key: string]: string | boolean }): Promise<RoomJoinMigration> {
        return this.Repository.insert(request);
    }

    async update(request: { [key: string]: string | boolean }): Promise<RoomJoinMigration> {
        if (Array.isArray(request)) request.map((element: { updatedAt: Date }) => {
            element.updatedAt = new Date();
        })
        return this.Repository.save(request);
    }

    async softDelete(request: RoomJoinMigration): Promise<RoomJoinMigration> {
        return this.Repository.save(request);
    }

    async hardDelete(request: RoomJoinMigration): Promise<RoomJoinMigration> {
        return this.Repository.delete(request);
    }
}