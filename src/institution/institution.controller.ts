import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateInstitutionDTO } from './dto/CreateInstitution.dto';
import { InstitutionEntity } from './institution.entity';
import { v4 as uuid } from 'uuid';
import { InstitutionService } from './institution.service';
import { InstitutionListDTO } from './dto/InstitutionList.dto';

@Controller('/institutions')
export class InstitutionController {
  constructor(private institutionService: InstitutionService) {}

  @Post()
  async createInstitution(@Body() dataInstitution: CreateInstitutionDTO) {
    const institutionEntity = new InstitutionEntity();
    institutionEntity.name = dataInstitution.name;
    institutionEntity.courses = dataInstitution.courses;
    institutionEntity.acronym = dataInstitution.acronym;
    institutionEntity.id = uuid();

    const returnCreateInstitution =
      await this.institutionService.createInstitution(institutionEntity);
    if (returnCreateInstitution.status === 409) {
      return {
        message: returnCreateInstitution.message,
        status: returnCreateInstitution.status,
      };
    } else {
      return {
        message: 'User created successfully!',
        user: new InstitutionListDTO(
          institutionEntity.name,
          institutionEntity.id,
          institutionEntity.acronym,
          institutionEntity.courses,
        ),
      };
    }
  }
}
