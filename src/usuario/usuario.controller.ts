import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { listaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosUsuario.email;
    usuarioEntity.senha = dadosUsuario.senha;
    usuarioEntity.nome = dadosUsuario.nome;
    usuarioEntity.repetir_senha = dadosUsuario.repetir_senha;
    usuarioEntity.sobrenome = dadosUsuario.sobrenome;
    usuarioEntity.curso = dadosUsuario.curso;

    usuarioEntity.id = uuid();
    this.usuarioRepository.criaUsuario(usuarioEntity);
    return {
      usuario: new listaUsuarioDTO(
        usuarioEntity.id,
        usuarioEntity.nome,
        usuarioEntity.curso,
      ),
      messagem: 'usuario criado com sucesso',
    };
  }

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listarUsuarios();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new listaUsuarioDTO(usuario.id, usuario.nome, usuario.curso),
    );

    return usuariosLista;
  }

  @Put('/:id')
  async atualizaUsuarioid(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioRepository.atualiza(
      id,
      novosDados,
    );

    return {
      usuario: usuarioAtualizado,
      messagem: 'usuario atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioRepository.remove(id);

    return {
      usuario: usuarioRemovido,
      message: 'usuario removido com sucesso',
    };
  }
}
