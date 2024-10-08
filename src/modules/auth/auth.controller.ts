import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth') // Grouping endpoints under 'auth'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' }) // Operation summary for Swagger
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  }) // Response for successful creation
  @ApiResponse({ status: 400, description: 'Bad Request.' }) // Response for bad request
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in a user' }) // Operation summary for Swagger
  @ApiResponse({ status: 200, description: 'Successfully logged in.' }) // Response for successful login
  @ApiResponse({ status: 401, description: 'Unauthorized.' }) // Response for unauthorized
  logIn(@Body() loginDto: LoginDto) {
    return this.authService.logIn(loginDto);
  }
}
