import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../guards';
import { AuthRequest } from '../models';
import { PedalboardService } from '../services';

@Controller('pedal-boards')
export class PedalboardController {
  constructor(private readonly pedalboardService: PedalboardService) {}

  /** ✅ Create a Pedal Board with an ordered list of pedals */
  @Post()
  @UseGuards(JwtAuthGuard)
  async createPedalBoard(
    @Req() req: AuthRequest,
    @Body()
    body: {
      name: string;
      pedals: {
        pedalId: string;
        order: number;
        knobValues: Record<string, number>;
      }[];
    }
  ) {
    return this.pedalboardService.createPedalBoard(
      body.name,
      req.user?._id,
      body.pedals
    );
  }

  /** ✅ Get all Pedal Boards */
  @Get()
  @UseGuards(JwtAuthGuard)
  async getPedalBoards(
    @Req() req: AuthRequest,
    @Query('populateUser') populateUser: boolean
  ) {
    return this.pedalboardService.getPedalBoards(req.user?._id, populateUser);
  }
}
