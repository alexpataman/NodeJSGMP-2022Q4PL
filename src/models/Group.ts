import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Permission } from "../types";
import { User } from "./User";

@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column("text")
  name!: string;
  @Column("text", { array: true, default: null })
  permissions!: Permission[];
  @CreateDateColumn()
  createdAt!: string;
  @UpdateDateColumn()
  updateAt!: string;
  @ManyToMany(() => User, (user) => user.groups)
  users!: User[];
}
