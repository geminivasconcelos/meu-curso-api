import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionEntity } from './institution.entity';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';


@Module({
  imports: [TypeOrmModule.forFeature([InstitutionEntity])],
  controllers: [InstitutionController],
  providers: [InstitutionService]
})
export class InstitutionModule {}
