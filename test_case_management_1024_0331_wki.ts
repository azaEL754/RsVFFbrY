// 代码生成时间: 2025-10-24 03:31:48
// test_case_management.ts

import { createConnection } from 'typeorm';
import { TestSuite } from './entity/TestSuite';
import { TestCase } from './entity/TestCase';

// Connect to the database
const connectDatabase = async () => {
  try {
    await createConnection();
    console.log('Database connected successfully.');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};

// Test Suite Management
class TestSuiteManager {
  // Add a new test suite
  static async addTestSuite(name: string): Promise<TestSuite | string> {
    try {
      const testSuite = new TestSuite();
      testSuite.name = name;
      await testSuite.save();
      return testSuite;
    } catch (error) {
      console.error('Error adding new test suite:', error);
      return 'Error adding new test suite.';
    }
  }

  // Get all test suites
  static async getAllTestSuites(): Promise<TestSuite[]> {
    try {
      return await TestSuite.find();
    } catch (error) {
      console.error('Error fetching all test suites:', error);
      return [];
    }
  }
}

// Test Case Management
class TestCaseManager {
  // Add a new test case
  static async addTestCase(testSuiteId: number, name: string): Promise<TestCase | string> {
    try {
      const testCase = new TestCase();
      testCase.name = name;
      testCase.testSuite = await TestSuite.findOne(testSuiteId);
      if (!testCase.testSuite) {
        return 'Test suite not found.';
      }
      await testCase.save();
      return testCase;
    } catch (error) {
      console.error('Error adding new test case:', error);
      return 'Error adding new test case.';
    }
  }

  // Get all test cases by suite id
  static async getTestCasesBySuiteId(testSuiteId: number): Promise<TestCase[]> {
    try {
      return await TestCase.find({ where: { testSuite: testSuiteId } });
    } catch (error) { {
      console.error('Error fetching test cases by suite id:', error);
      return [];
    }
  }
}

// Entity for Test Suite
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class TestSuite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

// Entity for Test Case
@Entity()
class TestCase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Relation to TestSuite
  @Column({ nullable: true })
  testSuiteId: number;

  // Relation to TestSuite with 'OneToOne' relation
  testSuite: TestSuite;
}

// Usage
connectDatabase();