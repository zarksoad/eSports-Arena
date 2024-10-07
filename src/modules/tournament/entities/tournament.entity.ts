import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;
}
