import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CheckPasswordService {
  async checkPassword(
    password: string,
    hashPassword: string,
  ): Promise<Boolean> {
    const validation = await bcrypt.compare(password, hashPassword);
    if (!validation) {
      throw new UnauthorizedException('Email or password incorrect');
    }
    return validation;
  }
}
