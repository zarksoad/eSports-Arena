import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TournamentEvent } from '../entities/tournament-event.entity';

@Injectable()
export class FindTournamentEventsBytIdService {
  constructor(
    @InjectRepository(TournamentEvent)
    private readonly tournamentEventRepository: Repository<TournamentEvent>,
  ) {}

  async findAllTournamentEvents(tournamentId: number): Promise<any[]> {
    const tournamentsEvent = await this.tournamentEventRepository.find({
      where: { tournamentId: tournamentId },
      relations: ['user'],
    });

    if (!tournamentsEvent) {
      throw new NotFoundException('tournament not found');
    }
    if (tournamentsEvent.length === 0) {
      throw new BadRequestException("Tournament doesn't have enough player");
    }

    const transformedEvents = tournamentsEvent.map((event) => ({
      id: event.id,
      tournamentId: event.tournamentId,
      userId: event.userId,
      score: event.score,
      user: event.user?.email,
    }));

    return transformedEvents;
  }
}
