import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';

@Controller('/usuarios') // o @controler já nos da uma rota, como não passamos parametros a rota será a rota raiz, ou seja, 3000, agora se passar
// uma rota dentro de controler isso será sua rota, nessa caso nossa rota é /usuarios
export class UserController {
  constructor(private userRepository: UserRepository) {}

  // private usuarioRepository = new UsuarioRepository();

  @Post()
  async criateUser(@Body() dateUser: CreateUserDTO) {
    this.userRepository.saveUser(dateUser);
    return { status: 'usuario criado', dateUser: dateUser };
  }

  @Get()
  async listUsers() {
    return this.userRepository.listUsers();
  }
}
