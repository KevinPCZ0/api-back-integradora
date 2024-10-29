
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const mockUserService = {
    getUserByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(() => 'jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should return user object if validation is successful', async () => {
      const user = { id: 1, email: 'test@example.com', password: await bcrypt.hash('password', 10) };
      mockUserService.getUserByEmail.mockResolvedValue(user);
      const result = await authService.validateUser('test@example.com', 'password');
      expect(result).toEqual({ id: 1, email: 'test@example.com' });
    });

    it('should return null if validation fails', async () => {
      mockUserService.getUserByEmail.mockResolvedValue(null);
      const result = await authService.validateUser('test@example.com', 'password');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user = { email: 'test@example.com', id: 1 };
      const result = await authService.login(user);
      expect(result).toEqual({ access_token: 'jwt-token' });
      expect(jwtService.sign).toHaveBeenCalledWith({ email: 'test@example.com', sub: 1 });
    });
  });
});
