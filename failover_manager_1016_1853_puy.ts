// 代码生成时间: 2025-10-16 18:53:46
import { createConnection, Connection, DataSource } from "typeorm";
import {Injectable} from "@nestjs/common";
import { Logger } from "@nestjs/common";

// FailoverManager is a service that handles database failover mechanisms.
@Injectable()
export class FailoverManager {
    private connection: Connection;
    private logger = new Logger(FailoverManager.name);

    constructor(private dataSource: DataSource) {
        this.connect();
    }

    // Connect to the primary database.
    private async connect(): Promise<void> {
        try {
            this.connection = await this.dataSource.createConnection();
            this.logger.log("Connected to primary database");
        } catch (error) {
            this.logger.error("Primary database connection failed, attempting failover\, error: ", error);
            await this.failover();
        }
    }

    // Attempt to connect to the failover database.
    private async failover(): Promise<void> {
        try {
            this.connection = await this.dataSource.createConnection({ name: "failover" });
            this.logger.log("Connected to failover database");
        } catch (error) {
            this.logger.error("Failover database connection also failed, error: ", error);
            // Handle further failover strategies or throw an error.
            throw new Error("Failover connection failed");
        }
    }

    // Execute a query on the database with failover support.
    async executeQuery(query: string): Promise<any> {
        try {
            // Use the primary connection to execute the query.
            return await this.connection.query(query);
        } catch (error) {
            this.logger.error("Query failed on primary database, attempting failover\, error: ", error);
            // Attempt to execute the query on the failover connection.
            try {
                return await this.connection.query(query);
            } catch (failoverError) {
                this.logger.error("Query failed on failover database, error: ", failoverError);
                // Handle the error, e.g., retry, log, or throw.
                throw new Error("Query failed on both primary and failover databases");
            }
        }
    }
}
