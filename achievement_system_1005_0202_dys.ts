// 代码生成时间: 2025-10-05 02:02:21
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Achievement } from './achievement.entity';

// 定义用户实体
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  // 用户与成就之间的关系（一个用户可以有多个成就）
  @OneToMany(() => Achievement, achievement => achievement.user)
  achievements: Achievement[];
}

// 定义成就实体
@Entity('achievements')
export class Achievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  unlocked: boolean;

  // 用户与成就之间的关系
  @Column()
  userId: number;
}

// 定义成就服务
export class AchievementService {
  constructor(private userRepository: typeof User, private achievementRepository: typeof Achievement) {}

  // 获取所有用户成就
  async getAllAchievements(): Promise<Achievement[]> {
    try {
      return await this.achievementRepository.find();
    } catch (error) {
      throw new Error('Failed to fetch achievements: ' + error.message);
    }
  }

  // 为用户解锁成就
  async unlockAchievement(userId: number, achievementId: number): Promise<Achievement> {
    try {
      // 检查成就是否存在
      const achievement = await this.achievementRepository.findOne(achievementId);
      if (!achievement) {
        throw new Error('Achievement not found');
      }
      // 更新成就状态
      achievement.unlocked = true;
      achievement.userId = userId;
      await this.achievementRepository.save(achievement);
      return achievement;
    } catch (error) {
      throw new Error('Failed to unlock achievement: ' + error.message);
    }
  }
}

// 使用示例
// const userService = new UserService(User);
// const user = await userService.createUser({ username: 'johndoe' });
// const achievementService = new AchievementService(User, Achievement);
// const achievement = await achievementService.unlockAchievement(user.id, 1);