import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { AppInitializer } from './seeds/seeds';
import { RoleService } from './modules/auth/services/insert-seeds/insert.role-seed.service';
import { InsertUserService } from './modules/auth/services/insert-seeds/insert-users-seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.name'),
        entities: config.get<string[]>('database.entities'),
        synchronize: config.get<boolean>('database.synchronize'),
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  providers: [JwtStrategy, AppInitializer, RoleService, InsertUserService],
})
export class AppModule {}
