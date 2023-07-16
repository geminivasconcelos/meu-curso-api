import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
    this.usuarioRepository.criaUsuario(dadosUsuario);
    return { dadosUsuario: dadosUsuario, status: 'usuario criado' };
  }

  @Get()
  async listaUsuarios() {
    return this.usuarioRepository.listarUsuarios();
  }
}
