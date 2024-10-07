import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TournamentEventService } from './tournament-event.service';
import { CreateTournamentEventDto } from './dto/create-tournament-event.dto';
import { UpdateTournamentEventDto } from './dto/update-tournament-event.dto';
import { UserId } from 'src/common/decorators/user/user-Id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';

@Controller('tournament-events')
@UseGuards(JwtAuthGuard)
export class TournamentEventController {
  constructor(
    private readonly tournamentEventService: TournamentEventService,
  ) {}

  @Post()
  enrollUser(
    @UserId() id: number,
    @Body() createTournamentEventDto: CreateTournamentEventDto,
  ) {
    return this.tournamentEventService.enrollUser(id, createTournamentEventDto);
  }

  // @Get()
  // findAll() {
  //   return this.tournamentEventService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentEventService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTournamentEventDto: UpdateTournamentEventDto,
  ) {
    return this.tournamentEventService.update(+id, updateTournamentEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentEventService.remove(+id);
  }
}
