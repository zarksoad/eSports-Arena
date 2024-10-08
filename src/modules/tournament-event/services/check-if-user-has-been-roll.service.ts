import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TournamentEvent } from '../entities/tournament-event.entity';

@Injectable()
export class CheckTournamentEventService {
  constructor(
    @InjectRepository(TournamentEvent)
    private readonly tournamentEventRepository: Repository<TournamentEvent>,
  ) {}

  async checkTournamentEvent(userId: number): Promise<void> {
    const useRoll = await this.tournamentEventRepository.findOne({
      where: { userId },
    });
    if (useRoll) {
      throw new UnauthorizedException(
        'The user has been registered in the tournament before',
      );
    }
  }
}
