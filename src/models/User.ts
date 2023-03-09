import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
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
  @Column("text")
  salt!: string;
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
}
