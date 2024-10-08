import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { TournamentEvent } from 'src/modules/tournament-event/entities/tournament-event.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'integer' })
  role_id: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => TournamentEvent, (tournamentEvent) => tournamentEvent.user)
  tournamentEvents: TournamentEvent[];
}
