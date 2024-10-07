import { CheckTournamentService } from './services/find.tournament-by-id.service';
import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    private readonly checkTournamentService: CheckTournamentService,
  ) {}

  async createTournament(
    createTournament: CreateTournamentDto,
  ): Promise<Tournament> {
    const book = await this.tournamentRepository.create(createTournament);
    return this.tournamentRepository.save(book);
  }

  async deleteTournament(id: number): Promise<Tournament> {
    const tournament = await this.checkTournamentService.checkTournament(id);
    tournament.status = false;
    return await this.tournamentRepository.save(tournament);
  }

  async UpdateTournament(
    id: number,
    updateTournamentDto: UpdateTournamentDto,
  ): Promise<Tournament> {
    const tournament = await this.checkTournamentService.checkTournament(id);
    Object.assign(tournament, updateTournamentDto);
    return await this.tournamentRepository.save(tournament);
  }
}
