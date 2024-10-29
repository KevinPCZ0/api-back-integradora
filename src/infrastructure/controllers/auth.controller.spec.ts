
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../domain/services/auth.service';
import { UserService } from '../../domain/services/user.service';
import { UnauthorizedException } from '@nestjs/common';


describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(() => 'jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: UserService,
          useValue: {},
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);

  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const req = { email: 'test@example.com', password: 'password' };
      const user = { email: 'test@example.com', id: 1 };

      // Mock the behavior of the service methods
      mockAuthService.validateUser.mockResolvedValue(user);
      mockAuthService.login.mockResolvedValue({ access_token: 'jwt-token' });

      // Call the controller method
      const result = await authController.login(req);

      // Assert the result
      expect(result).toEqual({
        access_token: 'jwt-token',
      });

      // Check that the service methods were called with the correct arguments
      expect(mockAuthService.validateUser).toHaveBeenCalledWith('test@example.com', 'password');
      expect(mockAuthService.login).toHaveBeenCalledWith(user);
    });

    it('should throw UnauthorizedException if validation fails', async () => {
      const req = { email: 'test@example.com', password: 'password' };

      // Mock the behavior of the service method to return null (invalid user)
      mockAuthService.validateUser.mockResolvedValue(null);

      await expect(authController.login(req)).rejects.toThrow(UnauthorizedException);
    });
  });
});
