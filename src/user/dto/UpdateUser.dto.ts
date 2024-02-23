import {
  IsArray,
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { EmailIsUnique } from '../validation/email-is-unique.validator';

export class UpdateUserDTO {
  @IsNotEmpty({
    message: 'The name cannot be empty',
  })
  @IsOptional()
  name: string;

  @IsNotEmpty({
    message: 'The lastname cannot be empty',
  })
  @IsOptional()
  lastName: string;

  @IsEmail(undefined, { message: 'The email provided is invalid' })
  @IsNotEmpty()
  @IsOptional()
  @EmailIsUnique({ message: 'There is already a user with this email' })
  email: string;

  @MinLength(6, {
    message: 'Checks if the password is longer than 6 characteres',
  })
  @IsOptional()
  password: string;

  @MinLength(6, {
    message: 'Checks if the password is longer than 6 characteres',
  })
  @IsOptional()
  repeatPassword: string;

  @IsArray()
  @IsOptional()
  curso: {id: number, nome: string}[];

  @IsArray()
  @IsOptional()
  instituicao: {id: number, nome: string}[];
}
