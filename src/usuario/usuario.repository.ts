import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
  private usuarios = [];

  async criaUsuario(usuario) {
    this.usuarios.push(usuario);
  }

  async listarUsuarios() {
    return this.usuarios;
  }

  async buscaUsuarioEmail(email: string) {

    const buscaEmail = this.usuarios.find((usuario) => usuario.email === email);
    return buscaEmail !== undefined;
  }

  private buscaId(id: string) {
    const possivelUsuario = this.usuarios.find(
      (usuarioSalvo) => usuarioSalvo.id === id,
    );

    if (!possivelUsuario) {
      throw new Error('usuario nao existe');
    }
    return possivelUsuario;
  }

  async atualiza(id: string, dadosAtualizacao: Partial<UsuarioEntity>) {
    const usuario = this.buscaId(id);
    Object.entries(dadosAtualizacao).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }
      usuario[chave] = valor;
    });
    return usuario;
  }

  async remove(id: string) {
    const usuario = this.buscaId(id);
    this.usuarios = this.usuarios.filter(
      (usuarioSalvo) => usuarioSalvo.id !== id,
    );
    return usuario;
  }
}
