import { IsNumber, IsOptional } from 'class-validator';

export class CreateTournamentEventDto {
  @IsNumber({}, { message: 'tournament should be a number' })
  tournamentId: number;

  @IsOptional()
  @IsNumber({}, { message: 'UserId should be a number' })
  userId: number;

  @IsOptional()
  @IsNumber({}, { message: 'score should be a number' })
  score: number;
}
