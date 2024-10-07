import { Module } from '@nestjs/common';
import { TournamentEventService } from './tournament-event.service';
import { TournamentEventController } from './tournament-event.controller';

@Module({
  controllers: [TournamentEventController],
  providers: [TournamentEventService],
})
export class TournamentEventModule {}
