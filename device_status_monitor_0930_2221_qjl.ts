// 代码生成时间: 2025-09-30 22:21:47
import { createConnection, EntitySchema } from 'typeorm';
import { Device } from './entity/Device'; // Assuming Device entity is defined in a separate file

// Define the database connection options
const connectionOptions = {
  type: 'postgres', // or 'mysql', 'sqlite', 'oracle', 'mssql'
  host: 'localhost',
  port: 5432,
  username: 'your_database_user',
  password: 'your_database_password',
  database: 'your_database_name',
  entities: [
    Device // Add the entity class that represents the Device table
  ],
  synchronize: true, // Use false in production for better performance and to handle migrations
};

// Create a connection to the database
createConnection(connectionOptions).then(async connection => {
  // Obtain the repository for the Device entity
  const deviceRepository = connection.getRepository(Device);

  try {
    // Retrieve all devices from the database
    const devices = await deviceRepository.find();

    // Log the status of each device
    devices.forEach(device => {
      console.log(`Device ID: ${device.id}, Status: ${device.status}`);
    });
  } catch (error) {
    // Handle any errors that occur
    console.error('An error occurred while retrieving device status:', error);
  } finally {
    // Close the database connection
    await connection.close();
  }
}).catch(error => {
  // Handle connection errors
  console.error('Failed to connect to the database:', error);
});
