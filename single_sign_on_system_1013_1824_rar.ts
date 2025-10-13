// 代码生成时间: 2025-10-13 18:24:53
import { createConnection } from "typeorm";
import { Session } from "./entities/Session"; // Import the Session entity
import { User } from "./entities/User"; // Import the User entity

// Define a class for the Single Sign On (SSO) system
class SingleSignOnSystem {
  // Create a connection to the database
  static async createDatabaseConnection(): Promise<void> {
    try {
      await createConnection();
      console.log("Database connection established.");
    } catch (error) {
      console.error("Failed to connect to the database: ", error);
    }
  }

  // Method to authenticate a user
  static async authenticateUser(username: string, password: string): Promise<boolean> {
    try {
      // Find user by username
      const user = await User.findOne({ where: { username } });
      if (!user) {
        throw new Error("User not found.");
      }

      // Verify password (This should be hashed and compared securely in production)
      if (user.password !== password) {
        throw new Error("Invalid password.");
      }

      // Create a new session for the user
      const session = new Session();
      session.user = user;
      await session.save();

      return true;
    } catch (error) {
      console.error("Authentication failed: ", error);
      return false;
    }
  }

  // Method to check if a user is already logged in
  static async checkLogin(username: string): Promise<boolean> {
    try {
      const session = await Session.findOne({ where: { user: { username } } });
      return session !== undefined;
    } catch (error) {
      console.error("Failed to check login: ", error);
      return false;
    }
  }

  // Method to end a session (logout)
  static async endSession(sessionToken: string): Promise<boolean> {
    try {
      const session = await Session.findOne({ where: { token: sessionToken } });
      if (!session) {
        throw new Error("Session not found.");
      }

      await session.remove();
      return true;
    } catch (error) {
      console.error("Failed to end session: ", error);
      return false;
    }
  }
}

// Usage example
(async () => {
  await SingleSignOnSystem.createDatabaseConnection();
  const isAuthenticated = await SingleSignOnSystem.authenticateUser("testuser", "password123");
  if (isAuthenticated) {
    console.log("User authenticated successfully.");
  } else {
    console.log("Authentication failed.");
  }
  const isLoggedIn = await SingleSignOnSystem.checkLogin("testuser");
  console.log("Is user logged in? ", isLoggedIn);
  const isSessionEnded = await SingleSignOnSystem.endSession("some-session-token");
  console.log("Session ended: ", isSessionEnded);
})();