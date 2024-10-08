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
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('tournaments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  @Roles(1)
  enrollUser(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentService.createTournament(createTournamentDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ) {
    return this.tournamentService.UpdateTournament(id, updateTournamentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tournamentService.deleteTournament(id);
  }
}
