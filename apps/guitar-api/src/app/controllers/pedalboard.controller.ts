import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../guards';
import { AuthRequest } from '../models';
import { PedalboardService } from '../services';
import { PedalBoard } from '../schemas';
import { BaseController } from './base.controller';

@Controller('pedal-boards')
@UseGuards(JwtAuthGuard)
export class PedalboardController extends BaseController<PedalBoard> {
  constructor(private readonly pedalboardService: PedalboardService) {
    super(pedalboardService);
  }

  /** ✅ Create a Pedal Board with an ordered list of pedals */
  @Post()
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
  async getPedalBoards(
    @Req() req: AuthRequest,
    @Query('populateUser') populateUser: boolean
  ) {
    return this.pedalboardService.getPedalBoards(req.user?._id, populateUser);
  }
}
