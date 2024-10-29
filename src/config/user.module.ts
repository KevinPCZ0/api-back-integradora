import { Module } from '@nestjs/common';
import { UserController } from '../infrastructure/controllers/user.controller';
import { UserService } from '../domain/services/user.service';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { PrismaUserRepository } from '../infrastructure/prisma/prisma-user.repository';

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        PrismaService,
        {
            provide: 'UserRepository',
            useClass: PrismaUserRepository
        }
    ],
    exports: [UserService]
})
export class UserModule {}
