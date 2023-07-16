export class UsuarioRepository {
  private usuarios = [];

  async criaUsuario(usuario) {
    this.usuarios.push(usuario);
  }

  async listarUsuarios(){
    return this.usuarios
  }
}
