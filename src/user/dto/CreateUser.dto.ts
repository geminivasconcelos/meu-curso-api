import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

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
  email: string;

  @MinLength(6, {
    message: 'Checks if the password is longer than 6 characteres',
  })
  password: string;
}
