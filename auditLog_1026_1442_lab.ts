// 代码生成时间: 2025-10-26 14:42:58
// auditLog.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// 定义安全审计日志实体
@Entity()
class AuditLog extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    message: string;

    @Column({ type: "text" })
    user: string;

    @Column({ type: "text" })
    ip: string;

    @Column({ type: "enum", enum: ["INFO", "WARNING", "ERROR"] })
    level: "INFO" | "WARNING" | "ERROR";

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    // 构建安全审计日志的构造函数
    constructor(message: string, user: string, ip: string, level: "INFO" | "WARNING" | "ERROR") {
        super();
        this.message = message;
        this.user = user;
        this.ip = ip;
        this.level = level;
    }
}

// 安全审计日志服务
class AuditLogService {
    private auditLogRepository: typeof AuditLog;

    constructor(auditLogRepository: typeof AuditLog) {
        this.auditLogRepository = auditLogRepository;
    }

    // 创建安全审计日志记录
    async createAuditLog(message: string, user: string, ip: string, level: "INFO" | "WARNING" | "ERROR"): Promise<void> {
        try {
            const auditLog = new AuditLog(message, user, ip, level);
            await this.auditLogRepository.create(auditLog).save();
        } catch (error) {
            console.error("Error creating audit log: ", error);
            throw new Error("Failed to create audit log: " + error.message);
        }
    }
}

// 导出审计日志实体和服务
export { AuditLog, AuditLogService };
