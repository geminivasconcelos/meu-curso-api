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
import { UpdateInstitutionDTO } from './dto/UpdateInstitution.dto';

@Controller('/institutions')
export class InstitutionController {
  constructor(private institutionService: InstitutionService) {}

  @Post()
  async createInstitution(@Body() dataInstitution: CreateInstitutionDTO) {
    const institutionEntity = new InstitutionEntity();
    institutionEntity.name = dataInstitution.name;
    institutionEntity.courses = dataInstitution.courses;
    institutionEntity.acronym = dataInstitution.acronym;
    institutionEntity.uuid = uuid();

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
          institutionEntity.uuid,
          institutionEntity.acronym,
          institutionEntity.courses,
        ),
      };
    }
  }

  @Get()
  async listInstitutions(){
    const savedInstitutioins = await this.institutionService.listInstitutions()
    return savedInstitutioins
  }

  @Get('/:uuid')
  async singleListUser(@Param('uuid') uuid: string) {
    const possibleInstitutionFound = await this.institutionService.singleInstitution(uuid)
    return possibleInstitutionFound;
  }

  
  @Put('/:uuid')
  async updateUser(
    @Param('uuid') uuid: string,
    @Body() dataToUpdate: UpdateInstitutionDTO,
  ) {
    const updatedInstitution = await this.institutionService.updateInstitution(uuid, dataToUpdate);

    return {
      institution: updatedInstitution,
      message: 'Institution updated successfully!',
    };
  }

  @Delete('/:uuid')
  async deleteUser(@Param('uuid') uuid: string) {
    const institutionRemoved = await this.institutionService.deleteInstitution(uuid);

    return {
      institution: institutionRemoved,
      message: 'Institution successfully deleted',
    };
  }
}
