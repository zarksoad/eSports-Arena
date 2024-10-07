import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CheckEmailExistService } from './check-if-email-exist.service';
import { HashPasswordService } from './hash-password.service';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../../dto/create-user.dto';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly checkEmailService: CheckEmailExistService,
    private readonly hashPasswordService: HashPasswordService,
  ) {}

  async createUser(createUserDTO: CreateUserDto): Promise<User> {
    await this.checkEmailService.checkUser(createUserDTO.email);
    createUserDTO.password = await this.hashPasswordService.hashPassword(
      createUserDTO.password,
    );
    const user = await this.userRepository.create(createUserDTO);
    const newUser = await this.userRepository.save(user);
    return newUser;
  }
}
