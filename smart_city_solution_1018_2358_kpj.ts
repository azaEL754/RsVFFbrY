// 代码生成时间: 2025-10-18 23:58:49
import { createConnection } from "typeorm";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

// Entity representing a Sensor in the smart city solution
@Entity()
class Sensor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    location: string;

    @Column()
    type: string;

    @Column()
    lastData: Date;
}

// Entity representing a User in the smart city solution
@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
}

// Service class for sensor operations
class SensorService {
    private connection: any;

    constructor() {
        this.connection = createConnection({
            type: "postgres", // Adjust type according to your database
            host: "localhost",
            port: 5432,
            username: "your_username",
            password: "your_password",
            database: "smart_city",
            entities: [Sensor, User],
            synchronize: true,
            logging: false,
        });
    }

    // Method to add a new sensor
    async addSensor(sensor: Sensor): Promise<Sensor> {
        try {
            const sensorRepository = this.connection.getRepository(Sensor);
            return await sensorRepository.save(sensor);
        } catch (error) {
            console.error("Error adding sensor: ", error);
            throw error;
        }
    }

    // Method to get all sensors
    async getAllSensors(): Promise<Sensor[]> {
        try {
            const sensorRepository = this.connection.getRepository(Sensor);
            return await sensorRepository.find();
        } catch (error) {
            console.error("Error retrieving sensors: ", error);
            throw error;
        }
    }
}

// Service class for user operations
class UserService {
    private connection: any;

    constructor() {
        this.connection = createConnection({
            type: "postgres", // Adjust type according to your database
            host: "localhost",
            port: 5432,
            username: "your_username",
            password: "your_password",
            database: "smart_city",
            entities: [Sensor, User],
            synchronize: true,
            logging: false,
        });
    }

    // Method to add a new user
    async addUser(user: User): Promise<User> {
        try {
            const userRepository = this.connection.getRepository(User);
            return await userRepository.save(user);
        } catch (error) {
            console.error("Error adding user: ", error);
            throw error;
        }
    }

    // Method to get all users
    async getAllUsers(): Promise<User[]> {
        try {
            const userRepository = this.connection.getRepository(User);
            return await userRepository.find();
        } catch (error) {
            console.error("Error retrieving users: ", error);
            throw error;
        }
    }
}

// Main function to initialize and run the smart city solution
async function main() {
    try {
        const sensorService = new SensorService();
        const userService = new UserService();

        // Add a new sensor example
        const newSensor = new Sensor();
        newSensor.location = "City Center";
        newSensor.type = "Temperature";
        newSensor.lastData = new Date();
        await sensorService.addSensor(newSensor);

        // Add a new user example
        const newUser = new User();
        newUser.name = "John Doe";
        newUser.email = "john.doe@example.com";
        await userService.addUser(newUser);

        console.log("Smart city solution initialized and running.");
    } catch (error) {
        console.error("Error initializing smart city solution: ", error);
    }
}

main();