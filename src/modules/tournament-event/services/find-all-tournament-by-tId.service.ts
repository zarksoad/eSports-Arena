import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TournamentEvent } from '../entities/tournament-event.entity';

@Injectable()
export class FindTournamentEventsBytIdService {
  constructor(
    @InjectRepository(TournamentEvent)
    private readonly tournamentEventRepository: Repository<TournamentEvent>,
  ) {}

  async findAllTournamentEvents(
    tournamentId: number,
  ): Promise<TournamentEvent[]> {
    const tournamentsEvent = await this.tournamentEventRepository.find({
      where: { tournamentId },
      relations: ['user'],
    });
    if (!tournamentsEvent) {
      throw new NotFoundException('tournament not found');
    }
    return tournamentsEvent;
  }
}
