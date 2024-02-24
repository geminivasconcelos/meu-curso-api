import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';

@Injectable()
export class CourseService {
  constructor() {}
}
