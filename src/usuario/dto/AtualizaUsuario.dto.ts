import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { EmailUnico } from '../validacao/email-unico.validator';

export class AtualizaUsuarioDTO {
  @IsNotEmpty({ message: 'O nome nao pode ser vazio' })
  nome: string;

  @IsNotEmpty({ message: 'O nome nao pode ser vazio' })
  sobrenome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailUnico({ message: 'Ja existe um usuario com este email' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  senha: string;

  @MinLength(6, { message: 'Verifique se as senhas sao iguais' })
  repetir_senha: string;

  @IsNotEmpty({ message: 'Adicione um curso' })
  curso: string;
}
