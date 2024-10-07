import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TournamentEventService } from './tournament-event.service';
import { CreateTournamentEventDto } from './dto/create-tournament-event.dto';
import { UpdateTournamentEventDto } from './dto/update-tournament-event.dto';

@Controller('tournament-event')
export class TournamentEventController {
  constructor(private readonly tournamentEventService: TournamentEventService) {}

  @Post()
  create(@Body() createTournamentEventDto: CreateTournamentEventDto) {
    return this.tournamentEventService.create(createTournamentEventDto);
  }

  @Get()
  findAll() {
    return this.tournamentEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentEventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTournamentEventDto: UpdateTournamentEventDto) {
    return this.tournamentEventService.update(+id, updateTournamentEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentEventService.remove(+id);
  }
}
