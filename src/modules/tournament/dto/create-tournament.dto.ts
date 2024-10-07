import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTournamentDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
