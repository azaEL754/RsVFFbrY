// 代码生成时间: 2025-10-30 04:19:12
 * numerical_integration_calculator.ts
 *
 * A simple numerical integration calculator using TypeScript and TypeORM framework.
 * It calculates the definite integral of a function using basic numerical methods.
 * This example uses the trapezoidal rule for integration.
 */

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Define the function interface for the integrand
interface IntegrandFunction {
  (x: number): number;
}

// Define the entity for storing integral calculations
@Entity()
class IntegralCalculation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lowerBound: number;

  @Column()
  upperBound: number;

  @Column()
  n: number;
  // Number of subintervals

  @Column()
  result: number;
}

// Numerical Integration Calculator class
class NumericalIntegrationCalculator {
  // Function to perform numerical integration using the trapezoidal rule
  public static integrate(func: IntegrandFunction, lowerBound: number, upperBound: number, n: number): number {
    if (n <= 0) {
      throw new Error('Number of subintervals must be greater than 0');
    }

    const h = (upperBound - lowerBound) / n;
    let integral = 0.5 * (func(lowerBound) + func(upperBound));

    for (let i = 1; i < n; i++) {
      const x = lowerBound + i * h;
      integral += func(x);
    }

    integral *= h;
    return integral;
  }

  // Function to save integral calculation to the database
  public static async saveCalculation(func: IntegrandFunction, lowerBound: number, upperBound: number, n: number): Promise<void> {
    const result = this.integrate(func, lowerBound, upperBound, n);
    const calculation = new IntegralCalculation();
    calculation.lowerBound = lowerBound;
    calculation.upperBound = upperBound;
    calculation.n = n;
    calculation.result = result;

    await calculation.save(); // Assuming 'save' method is available on the entity
  }
}

// Example usage
const integrand: IntegrandFunction = (x) => Math.exp(-x * x); // Example function for integration

// Calculate the integral of exp(-x^2) from -1 to 1 with 100 subintervals
NumericalIntegrationCalculator.integrate(integrand, -1, 1, 100);

// Save the integral calculation to the database
NumericalIntegrationCalculator.saveCalculation(integrand, -1, 1, 100);
