import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tournamentEvents')
export class TournamentEvent {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'integer' })
  tournamentId: number;

  @Column({ type: 'integer' })
  userId: number;
}
