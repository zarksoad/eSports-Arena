/* eslint-disable no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class CheckEmailExistService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async checkUser(email: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new NotFoundException('The email has already been used');
    }
    return email;
  }
}
