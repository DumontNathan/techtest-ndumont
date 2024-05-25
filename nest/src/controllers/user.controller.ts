import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUser } from 'src/application/use-cases/createUser';
import { DeleteUser } from 'src/application/use-cases/deleteUser';
import { GetAllUsers } from 'src/application/use-cases/getAllUsers';
import { GetUserById } from 'src/application/use-cases/getUserById';
import { UpdateUser } from 'src/application/use-cases/updateUser';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { UserDto } from 'src/dto/user.dto';

@Controller('users')
export class UserController {
  constructor(
    private getAllUsersUseCase: GetAllUsers,
    private createUserUseCase: CreateUser,
    private deleteUserUseCase: DeleteUser,
    private updateUserUseCase: UpdateUser,
    private getUserByIdUseCase: GetUserById,
  ) {}

  @Get()
  @HttpCode(200)
  async getAllUsers(): Promise<UserDto[]> {
    try {
      return await this.getAllUsersUseCase.execute();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Erreur interne du serveur',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get(':id')
  @HttpCode(200)
  async getUserById(@Param('id') userId: number): Promise<UserDto> {
    try {
      return await this.getUserByIdUseCase.execute(userId);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Erreur interne du serveur',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post()
  @HttpCode(200)
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.createUserUseCase.execute(createUserDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Erreur interne du serveur',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Patch(':id')
  @HttpCode(200)
  async updateUser(
    @Param('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.updateUserUseCase.execute(userId, updateUserDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Erreur interne du serveur',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteUser(@Param('id') deleteUserId: number) {
    try {
      console.log();

      return await this.deleteUserUseCase.execute(deleteUserId);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Erreur interne du serveur',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
