export class UsuarioRepository {
  private usuarios = [];

  async saveUser(usuairo) {
    this.usuarios.push(usuairo);
    console.log(this.usuarios);
  }
}
