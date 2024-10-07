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

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
