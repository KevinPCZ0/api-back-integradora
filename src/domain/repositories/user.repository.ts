import { User } from '../entities/user.entity';

export interface UserRepository {
  findById(id: number);

  findByEmail(email: string);

  create(user: User);

  update(user: User);
  
}