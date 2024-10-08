import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTournamentEventDto } from './dto/create-tournament-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentEvent } from './entities/tournament-event.entity';
import { Repository } from 'typeorm';
import { CheckTournamentService } from '../tournament/services/find.tournament-by-id.service';
import { FindTournamentEventsBytIdService } from './services/find-all-tournament-by-tId.service';
import { CheckTournamentEventService } from './services/check-if-user-has-been-roll.service';
import { ResultsTournament } from './entities/result-event.entity';

@Injectable()
export class TournamentEventService {
  constructor(
    @InjectRepository(TournamentEvent)
    private readonly tournamentEventRepository: Repository<TournamentEvent>,
    @InjectRepository(ResultsTournament)
    private readonly resultsTournamentRepository: Repository<ResultsTournament>,
    private readonly checkTournamentService: CheckTournamentService,
    private readonly findTournamentEventsBytIdService: FindTournamentEventsBytIdService,
    private readonly checkTournamentEventService: CheckTournamentEventService,
  ) {}

  private getRandomScore(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async enrollUser(
    UserId: number,
    createTournamentEventDto: CreateTournamentEventDto,
  ): Promise<TournamentEvent> {
    await this.checkTournamentEventService.checkTournamentEvent(UserId);
    await this.checkTournamentService.checkTournament(
      createTournamentEventDto.tournamentId,
    );
    createTournamentEventDto.userId = UserId;
    createTournamentEventDto.score = 0;
    const newTournamentEvent = this.tournamentEventRepository.create(
      createTournamentEventDto,
    );
    return this.tournamentEventRepository.save(newTournamentEvent);
  }

  async findAllTournamentEventById(
    tournamentId: number,
  ): Promise<TournamentEvent[]> {
    return await this.findTournamentEventsBytIdService.findAllTournamentEvents(
      tournamentId,
    );
  }
  async startMatch(tournamentId: number) {
    await this.checkTournamentService.checkTournament(tournamentId);

    const usersInTournament =
      await this.findTournamentEventsBytIdService.findAllTournamentEvents(
        tournamentId,
      );

    const tournamentEventsMap = new Map<number, TournamentEvent>();
    usersInTournament.forEach((event) => {
      tournamentEventsMap.set(event.userId, event);
    });

    for (const tournamentEvent of tournamentEventsMap.values()) {
      const randomScore = this.getRandomScore(0, 10000);
      tournamentEvent.score = randomScore;

      await this.tournamentEventRepository.update(
        { id: tournamentEvent.id },
        { score: randomScore },
      );
    }

    const sortedEvents = usersInTournament.sort((a, b) => b.score - a.score);

    const winner = sortedEvents[0];
    const loosers = sortedEvents
      .slice(1)
      .filter((loser) => loser.score !== null);

    await this.resultsTournamentRepository.save({
      tournamentId,
      userId: winner.userId,
      winner: `${winner.user} - Score: ${winner.score}, Position: 1`,
      looser: loosers
        .map(
          (loser, index) =>
            `${loser.user} - Score: ${loser.score}, Position: ${index + 2}`,
        )
        .join(', '),
    });

    return {
      winner: { email: winner.user, score: winner.score, position: 1 },
      loosers: loosers.map((loser, index) => ({
        email: loser.user,
        score: loser.score,
        position: index + 2,
      })),
    };
  }
}
