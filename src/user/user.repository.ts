import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users = [];

  async saveUser(user) {
    this.users.push(user);
  }

  async listUsers() {
    return this.users;
  }

  async listUser() {}

  async existsWithEmail(email: string) {
    const possibleUser = this.users.find((user) => user.email === email);
    return possibleUser !== undefined;
  }
}
