import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  Like,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Group } from "./Group";

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
  @ManyToMany(() => Group, (group) => group.users)
  @JoinTable()
  groups!: Group[];

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
