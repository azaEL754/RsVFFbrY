// 代码生成时间: 2025-09-30 01:52:26
import { createConnection, Entity, PrimaryGeneratedColumn, Column, BaseEntity, Repository, getConnection } from 'typeorm';

// Define the Patient entity
@Entity()
class Patient extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;
}

// Define the Training entity
@Entity()
class Training extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    duration: number; // in minutes

    // Relations to Patient entity
    @Column({ type: 'int' })
    patientId: number;
}

// Define the TrainingRepository for handling Training operations
class TrainingRepository extends Repository<Training> {}

// Define the PatientRepository for handling Patient operations
class PatientRepository extends Repository<Patient> {}

// Define the TrainingService with business logic
class TrainingService {
    private trainingRepository: Repository<Training>;
    private patientRepository: Repository<Patient>;

    constructor() {
        this.trainingRepository = getConnection().getRepository(Training);
        this.patientRepository = getConnection().getRepository(Patient);
    }

    // Create a new training session
    async createTrainingSession(trainingData: { name: string; duration: number; patientId: number }) {
        try {
            const training = this.trainingRepository.create(trainingData);
            await this.trainingRepository.save(training);
            return training;
        } catch (error) {
            console.error('Error creating training session:', error);
            throw new Error('Failed to create training session');
        }
    }

    // Get all training sessions for a patient
    async getTrainingSessionsForPatient(patientId: number) {
        try {
            const trainingSessions = await this.trainingRepository.find({ where: { patientId } });
            return trainingSessions;
        } catch (error) {
            console.error('Error fetching training sessions:', error);
            throw new Error('Failed to fetch training sessions');
        }
    }
}

// Usage example
(async () => {
    try {
        await createConnection({
            type: 'postgres',
            database: 'rehabilitation',
            entities: [
                Patient,
                Training
            ]
        });

        const trainingService = new TrainingService();

        // Create a new training session
        const trainingSession = await trainingService.createTrainingSession({
            name: 'Morning Stretch',
            duration: 30,
            patientId: 1
        });

        console.log('Created training session:', trainingSession);

        // Get all training sessions for a patient
        const trainingSessions = await trainingService.getTrainingSessionsForPatient(1);

        console.log('Training sessions for patient:', trainingSessions);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
})();