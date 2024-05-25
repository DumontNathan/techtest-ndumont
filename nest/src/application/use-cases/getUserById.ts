import { Injectable, Inject } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { User } from 'src/domain/entities/user';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class GetUserById {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(id: number): Promise<UserDto> {
    return await this.userService.getUserById(id);
  }
}
