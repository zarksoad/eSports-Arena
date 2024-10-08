import { User } from 'src/modules/auth/entities/user.entity';
import { TournamentEvent } from 'src/modules/tournament-event/entities/tournament-event.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @OneToMany(
    () => TournamentEvent,
    (tournamentEvent) => tournamentEvent.tournament,
  )
  tournamentEvents: TournamentEvent[];
}
