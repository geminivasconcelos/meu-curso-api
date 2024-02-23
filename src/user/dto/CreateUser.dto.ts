import { IsArray, IsEmail, IsJSON, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { EmailIsUnique } from '../validation/email-is-unique.validator';

export class CreateUserDTO {
  @IsNotEmpty({
    message: 'The name cannot be empty',
  })
  name: string;

  @IsNotEmpty({
    message: 'The lastname cannot be empty',
  })
  lastName: string;

  @IsEmail(undefined, { message: 'The email provided is invalid' })
  @IsNotEmpty()
  @EmailIsUnique({ message: 'There is already a user with this email' })
  email: string;

  @MinLength(6, {
    message: 'Checks if the password is longer than 6 characteres',
  })
  password: string;

  @MinLength(6, {
    message: 'Checks if the password is longer than 6 characteres',
  })
  repeatPassword: string;


  @IsArray()
  @IsOptional()
  curso: {id: number, nome: string}[];

  
  @IsArray()
  @IsOptional()
  instituicao: {id: number, nome: string}[];
}
