import { Injectable } from '@nestjs/common';
import { CreateUserService } from './create-user/create-user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { LogInService } from './log-in/login.service';
import { LoginDto } from '../dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loginService: LogInService,
  ) {}
  async createUser(createUserDTO: CreateUserDto): Promise<User> {
    return await this.createUserService.createUser(createUserDTO);
  }
  async logIn(
    loginDto: LoginDto,
  ): Promise<{ message: string; accessToken: string }> {
    return await this.loginService.LogIn(loginDto);
  }
}
