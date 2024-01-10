import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async saveUser(user: UserEntity) {
    this.users.push(user);
  }

  async listUsers() {
    return this.users;
  }

  async listUser() {}

  async existsWithEmail(email: string) {
    const possibleUser = this.users.find(
      (user) => user.email === email,
    );
    return possibleUser !== undefined;
  }
}
