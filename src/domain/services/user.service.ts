import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async getUserById(id: number){
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(null, name, email, hashedPassword);
    return this.userRepository.create(user);
  }
}
