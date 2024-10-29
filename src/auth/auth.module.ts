import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../domain/services/auth.service';
import { JwtStrategy } from '../domain/services/jwt.strategy';
import { UserService } from '../domain/services/user.service';
import { AuthController } from '../infrastructure/controllers/auth.controller';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { PrismaUserRepository } from '../infrastructure/prisma/prisma-user.repository';
import { LocalStrategy } from '../infrastructure/strategies/local.strategy';
import { UserModule } from '../config/user.module';


@Module({
  imports: [
    UserModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    ConfigModule,
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory:(configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
        }),
        inject: [ConfigService],
      }),
  ],
  providers: [    
    AuthService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    UserService,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  controllers: [AuthController],
  exports: [
    JwtStrategy, PassportModule, JwtModule, UserService
  ]
})
export class AuthModule {}
