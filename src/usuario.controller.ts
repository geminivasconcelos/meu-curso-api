import { UsuarioRepository } from './usuario.repository';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('/usuarios') // o @controler já nos da uma rota, como não passamos parametros a rota será a rota raiz, ou seja, 3000, agora se passar
// uma rota dentro de controler isso será sua rota, nessa caso nossa rota é /usuarios
export class UsuarioController {
  private usuarioRepository = new UsuarioRepository();

  @Post()
  async criateUser(@Body() dateUser) {
    this.usuarioRepository.saveUser(dateUser);
    return { status: 'usuario criado', dateUser: dateUser };
  }
}
