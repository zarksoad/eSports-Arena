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
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/entities/role.entity';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('tournament-events')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TournamentEventController {
  constructor(
    private readonly tournamentEventService: TournamentEventService,
  ) {}

  @Post()
  @Roles(2)
  enrollUser(
    @UserId() id: number,
    @Body() createTournamentEventDto: CreateTournamentEventDto,
  ) {
    return this.tournamentEventService.enrollUser(id, createTournamentEventDto);
  }

  @Patch()
  @Roles(1)
  startMatch(@Body() tournamentId: number) {}

  @Get(':id')
  findAll(TournamentId: number) {
    return this.tournamentEventService.findAllTournamentEventById(TournamentId);
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
