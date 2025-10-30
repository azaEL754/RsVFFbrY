// 代码生成时间: 2025-10-30 19:54:14
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import { createConnection, Connection, BaseEntity } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Define a TypeORM entity for storing configuration data
@Entity()
class Configuration extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    key: string;

    @Column('text')
    value: string;
}

// Configuration service to handle YAML configurations
class YamlConfigService {
    private connection: Connection;
    private configFilePath: string;

    constructor(configFilePath: string) {
        this.configFilePath = configFilePath;
        this.connectToDatabase();
    }

    // Connect to the database
    private async connectToDatabase(): Promise<void> {
        try {
            this.connection = await createConnection({
                type: 'sqlite',
                database: 'config.db',
                entities: [Configuration],
                synchronize: true,
                logging: false
            });
        } catch (error) {
            console.error('Failed to connect to the database:', error);
            throw new Error('Failed to connect to the database');
        }
    }

    // Load configuration from YAML file
    public async loadConfiguration(): Promise<object> {
        try {
            const configFileData = fs.readFileSync(this.configFilePath, 'utf8');
            const parsedConfig = yaml.load(configFileData) as object;
            return parsedConfig;
        } catch (error) {
            console.error('Failed to load YAML configuration:', error);
            throw new Error('Failed to load YAML configuration');
        }
    }

    // Save configuration to database
    public async saveConfiguration(config: object): Promise<void> {
        try {
            for (const [key, value] of Object.entries(config)) {
                await this.connection.getRepository(Configuration)
                    .save({ key, value });
            }
        } catch (error) {
            console.error('Failed to save configuration to database:', error);
            throw new Error('Failed to save configuration to database');
        }
    }
}

// Example usage
const configService = new YamlConfigService('./config.yaml');
configService.loadConfiguration().then(config => {
    console.log('Loaded configuration:', config);
    configService.saveConfiguration(config).then(() => {
        console.log('Configuration saved to database successfully');
    }).catch(error => {
        console.error('Error saving configuration:', error);
    });
}).catch(error => {
    console.error('Error loading configuration:', error);
});