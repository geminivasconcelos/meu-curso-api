import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';

@Controller('/usuarios')
export class UsuarioController {
  private usuarioRepository = new UsuarioRepository();

  @Post()
  async criaUsuario(@Body() dadosUsuario) {
    this.usuarioRepository.criaUsuario(dadosUsuario);
    return { dadosUsuario: dadosUsuario, status: 'usuario criado' };
  }

  @Get()
  async listaUsuarios() {
    return this.usuarioRepository.listarUsuarios();
  }
}
