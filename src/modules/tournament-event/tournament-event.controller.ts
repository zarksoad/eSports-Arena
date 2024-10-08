import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Param,
} from '@nestjs/common';
import { TournamentEventService } from './tournament-event.service';
import { CreateTournamentEventDto } from './dto/create-tournament-event.dto';
import { UserId } from 'src/common/decorators/user/user-Id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('tournament-events')
@UseGuards(JwtAuthGuard, RolesGuard)
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

  @Patch()
  @Roles(1)
  startMatch(@Body() tournamentId: number) {
    tournamentId = tournamentId['tournamentId'];
    return this.tournamentEventService.startMatch(tournamentId);
  }

  @Get(':id')
  findAll(@Param('id') tournamentId: number) {
    return this.tournamentEventService.findAllTournamentEventById(tournamentId);
  }
}
