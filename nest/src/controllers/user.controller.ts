import { Controller, Get } from '@nestjs/common';
import { GetFullNamesOfAllUsers } from 'src/application/use-cases/getFullNameOfAllUsers';

@Controller()
export class UserController {
  constructor(
    private useCase: GetFullNamesOfAllUsers
  ) {}

  @Get('/users')
  async getFullNamesOfAllUsers(): Promise<string[]> {
    return await this.useCase.execute();
  }
}
