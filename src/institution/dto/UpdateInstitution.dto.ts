import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateInstitutionDTO {
  @IsNotEmpty({
    message: 'The name cannot be empty',
  })
  name: string;

  @IsArray()
  @IsOptional()
  cursos: { id: number; nome: string }[];
}
