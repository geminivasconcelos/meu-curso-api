import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async listCourses() {
    return await this.courseRepository.find({ relations: ['institution'] });
  }

  async listCourse(uuid: string) {
    return await this.courseRepository.findOne({
      where: { uuid },
      relations: ['institution'],
    });
  }

  async listCourseNameInstitution(courseName: string, institutionName: string) {
    return await this.courseRepository.find({
      where: {
        name: courseName,
        institution: { name: institutionName },
      },
      relations: ['institution'],
    });
  }

  async createCourse(bodyCourse: any) {
    try {
      const course = this.courseRepository.create(bodyCourse);
      return await this.courseRepository.save(course);
    } catch (error) {
      throw new Error(`Erro ao criar o curso: ${error.message}`);
    }
  }

  async updateCourse(uuid: string, bodyCourse) {
    try {
      const existingCourse = await this.courseRepository.findOne({
        where: { uuid: uuid },
      });

      if (!existingCourse) {
        throw new NotFoundException(`Curso com ID ${uuid} não encontrado.`);
      }

      await this.courseRepository.update(uuid, bodyCourse);

      return await this.courseRepository.findOne({
        where: { uuid: uuid },
        relations: ['institution'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      if (error.name === 'QueryFailedError') {
        throw new BadRequestException(
          'Dados inválidos fornecidos para o curso.',
        );
      }

      throw new InternalServerErrorException(
        'Erro ao atualizar o curso. Tente novamente mais tarde.',
      );
    }
  }

  async listComponentsCourse(uuid: string){
    try {
      const course = await this.courseRepository.findOne({
        where: { uuid: uuid },
        relations: ['components'],
      });

      if (!course) {
        throw new NotFoundException(`Curso com ID ${uuid} não encontrado.`);
      }

      return course.components;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar componentes do curso.');
    }
  }
}
