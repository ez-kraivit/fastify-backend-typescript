import fastify from "fastify"
import { DataSource, DataSourceOptions } from "typeorm"
import { FastifyInstance } from "fastify"

import { AppDataSource } from "./database"
import { Router } from "./router"

export namespace Main {
    export const app: FastifyInstance = fastify({ logger: false })
    export let dataSource: DataSource;
    export class Server {

        public static async start(): Promise<FastifyInstance> {
            try {
                new Router(dataSource).init();
                console.log("Server is running on port 5120");
                
                await app.listen(5120)
            } catch (err) {
                app.log.error(err)
                process.exit(1)
            }
            return app
        }

        public static async connenct(options: DataSourceOptions): Promise<DataSource> {
            dataSource = new DataSource(<DataSourceOptions>options);
            await dataSource.initialize()
            return dataSource
        }

    }
}

Main.Server.connenct(<DataSourceOptions>AppDataSource).then(async()=>{
    await Main.Server.start();
});