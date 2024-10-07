import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class InsertUserService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async insertAdminUser(): Promise<void> {
    const existingUser = await this.entityManager.query(`
      SELECT email FROM users WHERE email IN('admin@eSportArena.com')
      `);
    if (existingUser.length > 0) {
      console.log('Admin already exists, skipping insertion.');
      return;
    }

    await this.entityManager.query(`
      INSERT INTO users (email, password, role_id) VALUES ('admin@eSportArena.com', '$2b$10$bwoSfZaHYiiuqIcIC4dT4Oug4sjnGvG2q4p50lfSkIDj1v.rzYSd2', 1);
      `);
  }
  async insertPlayerUser(): Promise<void> {
    const existingUser = await this.entityManager.query(`
      SELECT email FROM users WHERE email IN('player@eSportArena.com')
      `);
    if (existingUser.length > 0) {
      console.log('player already exists, skipping insertion.');
      return;
    }

    await this.entityManager.query(`
      INSERT INTO users (email, password, role_id) VALUES ('player@eSportArena.com', '$2b$10$bwoSfZaHYiiuqIcIC4dT4Oug4sjnGvG2q4p50lfSkIDj1v.rzYSd2', 2);
      `);
  }
}
