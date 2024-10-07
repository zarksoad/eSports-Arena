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

  findAll() {
    return `This action returns all tournament`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tournament`;
  }

  update(id: number, updateTournamentDto: UpdateTournamentDto) {
    return `This action updates a #${id} tournament`;
  }

  async deleteTournament(id: number): Promise<Tournament> {
    console.log('Aqui llego');
    const tournament = await this.checkTournamentService.checkTournament(id);
    tournament.status = false;
    return await this.tournamentRepository.save(tournament);
  }
}
