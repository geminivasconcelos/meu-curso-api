import { InstitutionEntity } from 'src/institution/institution.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'workload', nullable: false })
  workload: number;

  @Column({ name: 'situation', length: 100 })
  situation: string;

  // @Column({ name: 'institution' })
  @ManyToOne(() => InstitutionEntity, (instituicao) => instituicao.courses)
  institution: InstitutionEntity;
}
