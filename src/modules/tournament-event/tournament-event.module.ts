import { Module } from '@nestjs/common';
import { TournamentEventService } from './tournament-event.service';
import { TournamentEventController } from './tournament-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentEvent } from './entities/tournament-event.entity';
import { CheckTournamentService } from '../tournament/services/find.tournament-by-id.service';
import { Tournament } from '../tournament/entities/tournament.entity';
import { FindTournamentEventsBytIdService } from './services/find-all-tournament-by-tId.service';
import { CheckTournamentEventService } from './services/check-if-user-has-been-roll.service';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentEvent, Tournament])],
  controllers: [TournamentEventController],
  providers: [
    TournamentEventService,
    CheckTournamentService,
    FindTournamentEventsBytIdService,
    CheckTournamentEventService,
  ],
})
export class TournamentEventModule {}
