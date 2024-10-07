import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { saltRounds } from 'src/common/common-variable';
@Injectable()
export class HashPasswordService {
  async hashPassword(password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
  }
}
