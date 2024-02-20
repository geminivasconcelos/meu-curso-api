import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserListDTO } from './dto/UserList.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async listUsers() {
    const usersSaves = await this.userRepository.find();
    const usersList = usersSaves.map(
      (user) => new UserListDTO(user.uuid, user.name, user.lastname),
    );

    return usersList;
  }

  async singleListUser(uuid: string) {
    const userSave = await this.userRepository.findOneBy({ uuid: uuid });
    const user = new UserListDTO(
      userSave.uuid,
      userSave.name,
      userSave.lastname,
    );

    return user;
  }

  async createUser(userEntity: UserEntity) {
    await this.userRepository.save(userEntity);
  }

  async updateUser(uuid: string, userEntity: UpdateUserDTO) {
    await this.userRepository.update(uuid, userEntity);
  }

  async deleteUser(uuid: string) {
    await this.userRepository.delete(uuid);
  }
}
