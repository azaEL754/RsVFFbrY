// 代码生成时间: 2025-10-15 03:38:24
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { Course } from './entity/Course';
import { LearningProgress } from './entity/LearningProgress';

// 连接数据库
createConnection().then(connection => {
  // 连接成功
  console.log('Database connected');

  // 示例：创建一个新用户和一个新课程
  const newUser = new User();
  newUser.name = 'John Doe';
  newUser.email = 'john.doe@example.com';

  const newCourse = new Course();
  newCourse.title = 'TypeScript Fundamentals';
  newCourse.description = 'Learn the basics of TypeScript';

  // 保存到数据库
  connection.manager.save(newUser).then(user => {
    console.log('User created:', user);
    // 保存课程
    connection.manager.save(newCourse).then(course => {
      console.log('Course created:', course);
      // 创建学习进度
      const newProgress = new LearningProgress();
      newProgress.user = user;
      newProgress.course = course;
      newProgress.progress = 0;
      // 保存学习进度
      connection.manager.save(newProgress).then(progress => {
        console.log('Learning progress created:', progress);
        // 连接关闭
        connection.close();
      }).catch(error => {
        console.error('Error creating learning progress:', error);
        connection.close();
      });
    }).catch(error => {
      console.error('Error creating course:', error);
      connection.close();
    });
  }).catch(error => {
    console.error('Error creating user:', error);
    connection.close();
  });
}).catch(error => {
  console.error('Error connecting to database:', error);
});

// 用户实体
export class User {
  id: number;
  name: string;
  email: string;

  constructor(name: string = '', email: string = '') {
    this.name = name;
    this.email = email;
  }
}

// 课程实体
export class Course {
  id: number;
  title: string;
  description: string;

  constructor(title: string = '', description: string = '') {
    this.title = title;
    this.description = description;
  }
}

// 学习进度实体
export class LearningProgress {
  id: number;
  userId: number;
  courseId: number;
  progress: number;

  user: User;
  course: Course;

  constructor(user: User, course: Course, progress: number = 0) {
    this.user = user;
    this.course = course;
    this.progress = progress;
  }
}
