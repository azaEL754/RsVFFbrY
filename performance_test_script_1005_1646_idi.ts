// 代码生成时间: 2025-10-05 16:46:46
 * It demonstrates how to write a clean, maintainable, and scalable TypeScript program.
 */

import { createConnection, Connection, getConnection } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { randomUUID } from 'crypto';

// Define a simple entity for testing
@Entity()
class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  data: string;
}

// Function to generate random test data
function generateTestData(): TestEntity[] {
  const testData: TestEntity[] = [];
  for (let i = 0; i < 1000; i++) {
    const entity = new TestEntity();
    entity.data = randomUUID();
    testData.push(entity);
  }
  return testData;
}

// Function to insert test data
async function insertTestData(entities: TestEntity[]): Promise<void> {
  try {
    const connection = getConnection();
    await connection.createQueryBuilder()
      .insert()
      .into(TestEntity)
      .values(entities)
      .execute();
  } catch (error) {
    console.error('Error inserting test data:', error);
    throw error;
  }
}

// Function to measure and log performance
async function measurePerformance(entities: TestEntity[]): Promise<void> {
  console.time('Inserting test data');
  await insertTestData(entities);
  console.timeEnd('Inserting test data');
}

// Main function to run the performance test
async function runPerformanceTest(): Promise<void> {
  try {
    // Create a TypeORM connection
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'testdb',
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      synchronize: true,
      logging: false,
    });

    // Generate test data
    const testData = generateTestData();

    // Measure performance
    await measurePerformance(testData);
  } catch (error) {
    console.error('Error running performance test:', error);
  } finally {
    // Close the connection
    const connection = getConnection();
    await connection.close();
  }
}

// Execute the performance test
runPerformanceTest();