// 代码生成时间: 2025-10-23 07:57:28
import { createConnection } from 'typeorm';
import { User } from './entity/User'; // Assume the User entity is defined in a separate file
import { Permission } from './entity/Permission'; // Permission entity

// Define an interface for the user permissions
interface UserPermissions {
  userId: string;
  permissions: string[];
}

class AccessControlService {

  // Method to check if a user has a specific permission
  async hasPermission(userPermissions: UserPermissions, permission: string): Promise<boolean> {
    try {
      // Check if the permission exists in the user's permissions array
      return userPermissions.permissions.includes(permission);
    } catch (error) {
      console.error('Error checking permission:', error);
      throw new Error('Failed to check permission');
    }
  }

  // Method to load user permissions from the database
  async loadUserPermissions(userId: string): Promise<UserPermissions> {
    try {
      const connection = await createConnection(); // Establish database connection using TypeORM
      const userRepository = connection.getRepository(User);
      const permissionRepository = connection.getRepository(Permission);

      const user = await userRepository.findOne(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Retrieve the permissions associated with the user
      const permissions = await permissionRepository.find({ where: { userId } });
      const permissionList = permissions.map(permission => permission.name);

      return { userId, permissions: permissionList };
    } catch (error) {
      console.error('Error loading user permissions:', error);
      throw new Error('Failed to load user permissions');
    }
  }
}

// Example usage of the AccessControlService
(async () => {
  const accessControlService = new AccessControlService();
  try {
    const userPermissions = await accessControlService.loadUserPermissions('user123');
    const hasEditPermission = await accessControlService.hasPermission(userPermissions, 'edit');
    console.log(`User has edit permission: ${hasEditPermission}`);
  } catch (error) {
    console.error('Access control error:', error);
  }
})();