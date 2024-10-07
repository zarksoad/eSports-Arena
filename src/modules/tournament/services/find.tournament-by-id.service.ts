import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from '../entities/tournament.entity';

@Injectable()
export class CheckTournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async checkTournament(id: number): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne({
      where: { id },
    });
    if (!tournament) {
      throw new NotFoundException('tournament not found');
    }
    return tournament;
  }
}
