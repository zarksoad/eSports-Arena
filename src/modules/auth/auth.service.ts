import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './services/user.service';
import { LoginDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  async logIn(
    loginDto: LoginDto,
  ): Promise<{ message: string; accessToken: string }> {
    return await this.userService.logIn(loginDto);
  }
}
