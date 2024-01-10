import { UserEntity } from './user.entity';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { v4 as uuid } from 'uuid';
import { UserListDTO } from './dto/UserList.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Controller('/usuarios') // o @controler já nos da uma rota, como não passamos parametros a rota será a rota raiz, ou seja, 3000, agora se passar
// uma rota dentro de controler isso será sua rota, nessa caso nossa rota é /usuarios
export class UserController {
  constructor(private userRepository: UserRepository) {}

  // private usuarioRepository = new UsuarioRepository();

  @Post()
  async criateUser(@Body() dataUser: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.email = dataUser.email;
    userEntity.password = dataUser.password;
    userEntity.name = dataUser.name;
    userEntity.lastname = dataUser.lastName;
    userEntity.uuid = uuid();

    this.userRepository.saveUser(userEntity);
    return {
      message: 'User created successfully!',
      user: new UserListDTO(
        userEntity.name,
        userEntity.lastname,
        userEntity.uuid,
      ),
    };
  }

  @Get()
  async listUsers() {
    const savedUsers = await this.userRepository.listUsers();
    const usersList = savedUsers.map(
      (user) => new UserListDTO(user.name, user.lastname, user.uuid),
    );
    return usersList;
  }

  @Put('/:uuid')
  async updateUser(
    @Param('uuid') uuid: string,
    @Body() dataToUpdate: UpdateUserDTO,
  ) {
   const updatedUser = await this.userRepository.updateUser(uuid, dataToUpdate);

   return {
    user: updatedUser,
    message: 'User updated successfully!'
   }
  }
}
