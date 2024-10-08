import { User } from 'src/modules/auth/entities/user.entity';
import { Tournament } from 'src/modules/tournament/entities/tournament.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tournamentEvents')
export class ResultsTournament {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'integer' })
  tournamentId: number;

  @Column({ type: 'integer' })
  userId: number;

  @Column({ type: 'text', nullable: true })
  winner: string;

  @Column({ type: 'varchar', nullable: true })
  looser: string;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Tournament, (tournament) => tournament)
  @JoinColumn({ name: 'tournamentId' })
  tournament: Tournament;
}
