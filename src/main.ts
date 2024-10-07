import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './common/exception-filters/error.filter';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();
    app.useGlobalFilters(new HttpErrorFilter());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new ResponseInterceptor());
    await app.listen(3000);
    console.log(`Application is running on: http://localhost:3000`);
  } catch (error) {
    console.error('Error during application startup:', error);
    process.exit(1);
  }
}

bootstrap();
