import { User } from 'src/modules/auth/entities/user.entity';
import { Tournament } from 'src/modules/tournament/entities/tournament.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tournamentEvents')
export class TournamentEvent {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'integer' })
  tournamentId: number;

  @Column({ type: 'integer' })
  userId: number;

  @Column({ type: 'integer', nullable: true })
  score: number;

  @ManyToOne(() => User, (user) => user.tournamentEvents)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Tournament, (tournament) => tournament.tournamentEvents)
  @JoinColumn({ name: 'tournamentId' })
  tournament: Tournament;
}
