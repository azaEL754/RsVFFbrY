// 代码生成时间: 2025-10-14 02:11:22
import { createConnection } from 'typeorm';
import { Product } from './entity/Product';
import { User } from './entity/User';
import { Order } from './entity/Order';

// Establish a connection to the database
createConnection().then(async connection => {

  // Entities are now available via connection.entityMetadatas

  // Example to find a product by ID
  const productRepository = connection.getRepository(Product);
  try {
    const product = await productRepository.findOne(1);
    if (product) {
      console.log('Product found:', product);
    } else {
      console.log('Product not found');
    }
  } catch (error) {
    console.error('Error finding product:', error);
  }

  // Example to create a new user
  const userRepository = connection.getRepository(User);
  try {
    let user = new User();
    user.firstName = 'John';
    user.lastName = 'Doe';
    user.email = 'john.doe@example.com';
    await userRepository.save(user);
    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  }

  // Example to create a new order
  const orderRepository = connection.getRepository(Order);
  try {
    let order = new Order();
    order.totalAmount = 100;
    order.status = 'PENDING';
    await orderRepository.save(order);
    console.log('Order created:', order);
  } catch (error) {
    console.error('Error creating order:', error);
  }

}).catch(error => console.log('TypeORM connection error:', error));

/*
 * Entity Definitions
 */

// Product entity
export class Product {
  id: number;
  name: string;
  price: number;
  description?: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.price = 0;
  }
}

// User entity
export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;

  constructor() {
    this.id = 0;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
  }
}

// Order entity
export class Order {
  id: number;
  totalAmount: number;
  status: string;

  constructor() {
    this.id = 0;
    this.totalAmount = 0;
    this.status = 'PENDING';
  }
}
