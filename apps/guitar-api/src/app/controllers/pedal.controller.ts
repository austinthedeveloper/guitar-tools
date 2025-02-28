import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  Query,
} from '@nestjs/common';
import { PedalService } from '../services/pedal.service';
import { AuthRequest } from '../models';

@Controller('pedals')
export class PedalController {
  constructor(private readonly pedalService: PedalService) {}

  /** ✅ Create a new pedal */
  @Post()
  @Post()
  async create(@Req() req: AuthRequest, @Body() pedalData: any) {
    return this.pedalService.createPedal({
      ...pedalData,
      createdById: req.user?._id,
    });
  }

  /** ✅ Get all pedals */
  @Get()
  async findAll(
    @Req() req: AuthRequest,
    @Query('populateUser') populateUser: boolean
  ) {
    return this.pedalService.findAllPedals(req.user?._id, populateUser);
  }

  /** ✅ Get a single pedal */
  @Get(':id')
  async findOnePedal(@Param('id') id: string) {
    return this.pedalService.findOnePedal(id);
  }

  /** ✅ Update a pedal (knob names only) */
  @Put(':id')
  async updatePedal(@Param('id') id: string, @Body() pedalData: any) {
    return this.pedalService.updatePedal(id, pedalData);
  }

  /** ✅ Delete a pedal */
  @Delete(':id')
  async deletePedal(@Param('id') id: string) {
    return this.pedalService.deletePedal(id);
  }

  /** ✅ Create a Pedal Board with an ordered list of pedals */
  @Post('/pedal-board')
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
    return this.pedalService.createPedalBoard(
      body.name,
      req.user?._id,
      body.pedals
    );
  }

  /** ✅ Get all Pedal Boards */
  @Get('/pedal-boards')
  async getPedalBoards(
    @Req() req: AuthRequest,
    @Query('populateUser') populateUser: boolean
  ) {
    return this.pedalService.getPedalBoards(req.user?._id, populateUser);
  }
}
