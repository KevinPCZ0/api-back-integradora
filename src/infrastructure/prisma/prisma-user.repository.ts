/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<User | null> {
    const userId = typeof id === 'string' ? parseInt(id, 10) : id;
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;
    return new User(user.id, user.name, user.email, user.password);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return new User(user.id, user.name, user.email, user.password);
  }

  async create(user: User): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    return new User(newUser.id, newUser.name, newUser.email, newUser.password);
  }

  update(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
