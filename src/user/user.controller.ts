import { UserEntity } from './user.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { v4 as uuid } from 'uuid';

@Controller('/usuarios') // o @controler já nos da uma rota, como não passamos parametros a rota será a rota raiz, ou seja, 3000, agora se passar
// uma rota dentro de controler isso será sua rota, nessa caso nossa rota é /usuarios
export class UserController {
  constructor(private userRepository: UserRepository) {}

  // private usuarioRepository = new UsuarioRepository();

  @Post()
  async criateUser(@Body() dateUser: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.email = dateUser.email;
    userEntity.password = dateUser.password;
    userEntity.name = dateUser.name;
    userEntity.lastname = dateUser.lastName;
    userEntity.id = uuid();

    this.userRepository.saveUser(userEntity);
    return { message: 'User created successfully !', id: userEntity.id };
  }

  @Get()
  async listUsers() {
    return this.userRepository.listUsers();
  }
}
