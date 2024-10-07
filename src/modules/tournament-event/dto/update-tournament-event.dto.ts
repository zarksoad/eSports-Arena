import { PartialType } from '@nestjs/mapped-types';
import { CreateTournamentEventDto } from './create-tournament-event.dto';

export class UpdateTournamentEventDto extends PartialType(CreateTournamentEventDto) {}
