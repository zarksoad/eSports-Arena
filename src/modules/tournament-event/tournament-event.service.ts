import { Injectable } from '@nestjs/common';
import { CreateTournamentEventDto } from './dto/create-tournament-event.dto';
import { UpdateTournamentEventDto } from './dto/update-tournament-event.dto';

@Injectable()
export class TournamentEventService {
  create(createTournamentEventDto: CreateTournamentEventDto) {
    return 'This action adds a new tournamentEvent';
  }

  findAll() {
    return `This action returns all tournamentEvent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tournamentEvent`;
  }

  update(id: number, updateTournamentEventDto: UpdateTournamentEventDto) {
    return `This action updates a #${id} tournamentEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} tournamentEvent`;
  }
}
