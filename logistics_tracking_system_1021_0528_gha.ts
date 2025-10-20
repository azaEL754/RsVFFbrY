// 代码生成时间: 2025-10-21 05:28:35
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// Entity for Log
@Entity()
export class Log extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trackingNumber: string;

  @Column()
  status: string;

  @Column()
  message: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

// Service for handling logistics tracking
export class LogisticsService {
  constructor(private entityManager: EntityManager) {} // Dependency Injection for EntityManager

  // Method to create a new log entry
  async createLog(trackingNumber: string, status: string, message: string): Promise<Log | undefined> {
    try {
      const log = new Log();
      log.trackingNumber = trackingNumber;
      log.status = status;
      log.message = message;

      return await this.entityManager.save(Log, log);
    } catch (error) {
      console.error('Error creating log:', error);
      throw new Error('Failed to create log entry.');
    }
  }

  // Method to get all log entries
  async getAllLogs(): Promise<Log[]> {
    try {
      return await this.entityManager.find(Log);
    } catch (error) {
      console.error('Error fetching all logs:', error);
      throw new Error('Failed to fetch all log entries.');
    }
  }

  // Method to get a log entry by tracking number
  async getLogByTrackingNumber(trackingNumber: string): Promise<Log | undefined> {
    try {
      return await this.entityManager.findOneBy(Log, { trackingNumber });
    } catch (error) {
      console.error('Error fetching log by tracking number:', error);
      throw new Error('Failed to fetch log entry by tracking number.');
    }
  }
}

// Example usage of the LogisticsService
// You would typically use dependency injection to provide the EntityManager
// const entityManager = getEntityManager(); // Replace with actual method to get EntityManager
// const logisticsService = new LogisticsService(entityManager);

// Creating a new log entry
// logisticsService.createLog('12345', 'In Transit', 'Item has been shipped').then(log => {
//   console.log('Log created:', log);
// }).catch(error => {
//   console.error('Error creating log:', error);
// });

// Fetching all log entries
// logisticsService.getAllLogs().then(logs => {
//   console.log('All logs:', logs);
// }).catch(error => {
//   console.error('Error fetching all logs:', error);
// });

// Fetching a log entry by tracking number
// logisticsService.getLogByTrackingNumber('12345').then(log => {
//   console.log('Log by tracking number:', log);
// }).catch(error => {
//   console.error('Error fetching log by tracking number:', error);
// });