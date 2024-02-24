import { Controller } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseEntity } from './course.entity';

@Controller('courses')
export class CourseController {
  constructor(private service: CourseService) {}
}
