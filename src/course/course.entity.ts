import { CurricularComponentEntity } from 'src/curricular-component/curricular-component.entity';
import { InstitutionEntity } from 'src/institution/institution.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'workload', nullable: false })
  workload: number;

  @ManyToOne(() => InstitutionEntity, (instituicao) => instituicao.courses)
  institution: InstitutionEntity;

  @OneToMany(() => CurricularComponentEntity, component => component.course)
  components: CurricularComponentEntity[];
}
