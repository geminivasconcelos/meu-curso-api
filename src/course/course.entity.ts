import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Course')
export class CourseEntity {
    @PrimaryGeneratedColumn() id:string;
}
