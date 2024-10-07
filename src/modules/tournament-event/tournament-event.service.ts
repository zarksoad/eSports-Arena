import { Injectable } from '@nestjs/common';
import { CreateTournamentEventDto } from './dto/create-tournament-event.dto';
import { UpdateTournamentEventDto } from './dto/update-tournament-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentEvent } from './entities/tournament-event.entity';
import { Repository } from 'typeorm';
import { CheckTournamentService } from '../tournament/services/find.tournament-by-id.service';

@Injectable()
export class TournamentEventService {
  constructor(
    @InjectRepository(TournamentEvent)
    private readonly tournamentEventRepository: Repository<TournamentEvent>,
    private readonly checkTournamentService: CheckTournamentService,
  ) {}
  async enrollUser(
    UserId: number,
    createTournamentEventDto: CreateTournamentEventDto,
  ): Promise<TournamentEvent> {
    await this.checkTournamentService.checkTournament(
      createTournamentEventDto.tournamentId,
    );
    createTournamentEventDto.userId = UserId;
    const newTournamentEvent = this.tournamentEventRepository.create(
      createTournamentEventDto,
    );
    return this.tournamentEventRepository.save(newTournamentEvent);
  }

  async findAllTournamentEventById(): Promise<TournamentEvent[]> {
    return await this.tournamentEventRepository.find();
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
