import { User } from 'src/domain/entities/user';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

export const UserServiceKey = 'USER_PORT';
export interface UserService {
  getUsers: () => Promise<User[]>;
  getUserById: (id: number) => Promise<User>;
  createUser: (createUserDto: CreateUserDto) => Promise<User>;
  updateUser: (updateUserId: number, updateUserDto: UpdateUserDto) => Promise<UpdateResult>;
  deleteUser: (deleteUserId: number) => Promise<DeleteResult>;
  findUser: (createUserDto: CreateUserDto) => Promise<User>;
}
