import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Like,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column("text")
  login!: string;
  @Column("text")
  password!: string;
  @Column("numeric")
  age!: number;
  @Column({ type: "boolean", default: false })
  isDeleted!: boolean;
  @CreateDateColumn()
  createdAt!: string;
  @UpdateDateColumn()
  updateAt!: string;

  async delete() {
    this.isDeleted = true;
    await this.save();
    return this;
  }

  static getAutoSuggestUsers(loginSubstring: string, limit: number) {
    return User.find({
      where: {
        login: Like(`%${loginSubstring}%`),
      },
      order: { login: "ASC" },
      take: limit,
    });
  }
}
