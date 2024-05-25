import { Injectable, Inject, HttpException } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class DeleteUser {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(deleteUserId: number) {
    return await this.userService.deleteUser(deleteUserId);
  }
}
