import { DataSource, Repository, ObjectLiteral } from "typeorm";
import UserMigration from "../entities/User.Entities";

export default class UserRepository {
    private Repository: Repository<UserMigration> | ObjectLiteral;

    private manager: DataSource;

    constructor(dataSource: DataSource) {        
        this.manager = dataSource;      
        this.Repository = this.manager.getRepository(UserMigration);
    }

    async all(): Promise<UserMigration[]> {
        return await this.Repository.find({ where: { is_delete: false } });
    }

    async getLists(page: number = 0, limit: number = 50): Promise<Object> {
        const [list, count] = await Promise.all([
            this.Repository.find({ where: {  }, take: limit, skip: page > 1 ? (page - 1) * limit : 0, order: { updatedAt: "DESC" } }),
            this.Repository.count({ where: {  }, order: { updatedAt: "DESC" } }),
        ]);
        return { list, count, page, pageSize: limit };
    }

    async get(id: string): Promise<UserMigration> {
        return this.Repository.findOne({ where: { id: id, is_delete: false } });
    }

    async insert(request: { [key: string]: string | boolean }): Promise<UserMigration> {
        return this.Repository.insert(request);
    }

    async update(request: { [key: string]: string | boolean }): Promise<UserMigration> {
        if (Array.isArray(request)) request.map((element: { updatedAt: Date }) => {
            element.updatedAt = new Date();
        })
        return this.Repository.save(request);
    }

    async softDelete(request: UserMigration): Promise<UserMigration> {
        return this.Repository.save(request);
    }

    async hardDelete(request: UserMigration): Promise<UserMigration> {
        return this.Repository.delete(request);
    }
}