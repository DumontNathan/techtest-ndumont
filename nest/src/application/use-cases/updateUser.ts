import { Injectable, Inject, HttpException } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Injectable()
export class UpdateUser {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(updateUserId: number, updateUserDto: UpdateUserDto) {
    if (await this.userService.findUser(updateUserDto)) {
      throw new HttpException('Un utilisateur avec le même nom et prénom existe déjà.', 409);
  }
    return await this.userService.updateUser(updateUserId, updateUserDto);
  }
}
