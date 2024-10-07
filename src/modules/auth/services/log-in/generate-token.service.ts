import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GenerateTokenService {
  constructor(private jwtService: JwtService) {}

  async token(
    userId: number,
    roleId: number,
  ): Promise<{ message: string; accessToken: string }> {
    const payload = { userId: userId, roleId: roleId };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      message: 'This is the token',
      accessToken: accessToken,
    };
  }
}
