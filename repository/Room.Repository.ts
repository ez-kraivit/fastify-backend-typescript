import { DataSource, Repository, ObjectLiteral } from "typeorm";
import RoomMigration from "../entities/Room.Entities";

export default class RoomRepository {
    private Repository: Repository<RoomMigration> | ObjectLiteral;

    private manager: DataSource;

    constructor(dataSource: DataSource) {        
        this.manager = dataSource;      
        this.Repository = this.manager.getRepository(RoomMigration);
    }

    async all(): Promise<RoomMigration[]> {
        return await this.Repository.find({ where: { isDelete: false } });
    }

    async getLists(page: number = 0, limit: number = 50): Promise<Object> {
        const [list, count] = await Promise.all([
            this.Repository.find({ where: { isDelete:false }, take: limit, skip: page > 1 ? (page - 1) * limit : 0, order: { updatedAt: "DESC" } }),
            this.Repository.count({ where: { isDelete:false }, order: { updatedAt: "DESC" } }),
        ]);
        return { list, count, page, pageSize: limit };
    }

    async get(id: string): Promise<RoomMigration> {
        return this.Repository.findOne({ where: { id: id, isDelete: false } });
    }

    async insert(request: { [key: string]: string | boolean | string[] }): Promise<RoomMigration> {
        return this.Repository.insert(request);
    }

    async update(request: { [key: string]: string | boolean }): Promise<RoomMigration> {
        if (Array.isArray(request)) request.map((element: { updatedAt: Date }) => {
            element.updatedAt = new Date();
        })
        return this.Repository.save(request);
    }

    async softDelete(request: RoomMigration): Promise<RoomMigration> {
        return this.Repository.save(request);
    }

    async hardDelete(request: RoomMigration): Promise<RoomMigration> {
        return this.Repository.delete(request);
    }
}