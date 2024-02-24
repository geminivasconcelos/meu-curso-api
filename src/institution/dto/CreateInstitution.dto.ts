import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInstitutionDTO {
  @IsNotEmpty({
    message: 'The name cannot be empty',
  })
  name: string;

  @IsString()
  @IsOptional()
  acronym: string;

  @IsArray()
  @IsOptional()
  courses: { id: number; nome: string }[];
}
