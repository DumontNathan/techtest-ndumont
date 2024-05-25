import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/application/ports/user.port';
import { User } from 'src/domain/entities/user';
import { UserSchema } from '../schemas/user.schema';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDto } from 'src/dto/user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Injectable()
export class UserAdapter implements UserService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getUserById(userId: number): Promise<User | null> {
    const id = userId.toString();
    return this.usersRepository.findOneBy({ id });
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  updateUser(
    updateUserId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    const id = updateUserId.toString();
    const userToUpdate = { ...updateUserDto, id: updateUserDto.id.toString() };
    return this.usersRepository.update(id, userToUpdate);
  }

  findUser(user: CreateUserDto): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        lastName: user.lastName,
        firstName: user.firstName,
      },
    });
  }

  deleteUser(deleteUserId: number): Promise<DeleteResult> {
    return this.usersRepository.delete(deleteUserId);
  }
}
