import { CourseEntity } from 'src/course/course.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('curricular-component')
export class CurricularComponentEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'workload' })
  workload: string;

  @Column({ name: 'curriculum_syllabus' })
  curriculumSyllabus: string;

  @Column({ name: 'situation', length: 100 })
  situation: string;

  @Column({ name: 'final_note' })
  finalNote: string;

  @ManyToOne(() => CourseEntity, (course) => course.components)
  course: CourseEntity;

  @Column({ name: 'period' })
  period: string;

  @Column({ name: 'component_type' })
  componentType: string;
}
