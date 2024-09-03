import { UpdateInstitutionDTO } from './dto/UpdateInstitution.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InstitutionEntity } from './institution.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionListDTO } from './dto/InstitutionList.dto';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectRepository(InstitutionEntity)
    private readonly institutionRepository: Repository<InstitutionEntity>,
  ) {}

  async listInstitutions() {
    const instituionsSaves = await this.institutionRepository.find();
    const institutionsList = instituionsSaves.map(
      (institution) =>
        new InstitutionListDTO(
          institution.uuid,
          institution.name,
          institution.acronym,
          institution.courses,
        ),
    );

    return institutionsList;
  }

  async singleInstitution(uuid: string) {
    const institutionSave = await this.institutionRepository.findOneBy({
      uuid: uuid,
    });

    const institution = new InstitutionListDTO(
      institutionSave.uuid,
      institutionSave.name,
      institutionSave.acronym,
      institutionSave.courses,
    );

    return institution;
  }

  async createInstitution(institutionEntity: InstitutionEntity) {
    console.log(institutionEntity);
    const possibleInstitution = await this.institutionRepository.exists({
      where: { uuid: institutionEntity.uuid },
    });

    const returnCreateInstitution = possibleInstitution
      ? (new HttpException('Email already exists', HttpStatus.CONFLICT) as any)
      : await this.institutionRepository.save(institutionEntity);
    return returnCreateInstitution;
  }

  async updateInstitution(id: string, institutionDTO: UpdateInstitutionDTO) {
    await this.institutionRepository.update(id, institutionDTO);
  }

  async deleteInstitution(id: string) {
    await this.institutionRepository.delete(id);
  }
}
