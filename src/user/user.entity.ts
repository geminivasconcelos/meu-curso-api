import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'lastname', length: 200, nullable: false })
  lastname: string;

  @Column({ name: 'email', length: 100, nullable: false })
  email: string;

  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
