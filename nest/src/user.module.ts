import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServiceKey } from './application/ports/user.port';
import { CreateUser } from './application/use-cases/createUser';
import { DeleteUser } from './application/use-cases/deleteUser';
import { GetAllUsers } from './application/use-cases/getAllUsers';
import { GetUserById } from './application/use-cases/getUserById';
import { UpdateUser } from './application/use-cases/updateUser';
import { UserController } from './controllers/user.controller';
import { UserAdapter } from './repositories/adapters/user.adapter';
import { UserSchema } from './repositories/schemas/user.schema';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [
    {
      provide: UserServiceKey,
      useClass: UserAdapter,
    },
    GetAllUsers,
    CreateUser,
    DeleteUser,
    GetUserById,
    UpdateUser
  ],
})
export class UserModule {}
