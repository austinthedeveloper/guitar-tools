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
  UseGuards,
} from '@nestjs/common';
import { PedalService } from '../services/pedal.service';
import { AuthRequest } from '../models';
import { JwtAuthGuard } from '../guards';
import { ParseObjectIdPipe } from '../pipes';

@Controller('pedals')
export class PedalController {
  constructor(private readonly pedalService: PedalService) {}

  /** ✅ Create a new pedal */
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req: AuthRequest, @Body() pedalData: any) {
    return this.pedalService.createPedal(pedalData, req.user?._id);
  }

  /** ✅ Get all pedals */
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Req() req: AuthRequest,
    @Query('populateUser') populateUser: boolean
  ) {
    return this.pedalService.findAllPedals(req.user?._id, populateUser);
  }

  /** ✅ Get a single pedal */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOnePedal(@Param('id', ParseObjectIdPipe) id: string) {
    return this.pedalService.findOnePedal(id);
  }

  /** ✅ Update a pedal (knob names only) */
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updatePedal(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() pedalData: any
  ) {
    return this.pedalService.updatePedal(id, pedalData);
  }

  /** ✅ Delete a pedal */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePedal(@Param('id', ParseObjectIdPipe) id: string) {
    return this.pedalService.deletePedal(id);
  }
}
