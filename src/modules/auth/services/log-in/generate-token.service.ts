import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GenerateTokenService {
  constructor(private jwtService: JwtService) {}

  async token(
    userId: number,
  ): Promise<{ message: string; accessToken: string }> {
    const payload = { userId: userId };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      message: 'This is the token',
      accessToken: accessToken,
    };
  }
}
