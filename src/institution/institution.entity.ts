import { CourseEntity } from 'src/course/course.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'institutions' })
export class InstitutionEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;
  
  @Column({ name: 'acronym', length: 100, nullable: false })
  acronym: string;

  // @Column('simple-json', { nullable: false, default: [] })
  @OneToMany(() => CourseEntity, (curso) => curso.institution)
  courses: { id: number; nome: string }[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
