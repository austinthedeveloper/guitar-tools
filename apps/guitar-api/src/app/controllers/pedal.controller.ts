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
  @Get('single/:id')
  @UseGuards(JwtAuthGuard)
  async findOnePedal(@Param('id', ParseObjectIdPipe) id: string) {
    return this.pedalService.findOnePedal(id);
  }

  /** ✅ Update a pedal (knob names only) */
  @Put('single/:id')
  @UseGuards(JwtAuthGuard)
  async updatePedal(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() pedalData: any
  ) {
    return this.pedalService.updatePedal(id, pedalData);
  }

  /** ✅ Delete a pedal */
  @Delete('single/:id')
  @UseGuards(JwtAuthGuard)
  async deletePedal(@Param('id', ParseObjectIdPipe) id: string) {
    return this.pedalService.deletePedal(id);
  }

  /** ✅ Create a Pedal Board with an ordered list of pedals */
  @Post('/pedal-board')
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
    return this.pedalService.createPedalBoard(
      body.name,
      req.user?._id,
      body.pedals
    );
  }

  /** ✅ Get all Pedal Boards */
  @Get('/pedal-boards')
  @UseGuards(JwtAuthGuard)
  async getPedalBoards(
    @Req() req: AuthRequest,
    @Query('populateUser') populateUser: boolean
  ) {
    return this.pedalService.getPedalBoards(req.user?._id, populateUser);
  }

  @Get('/pedal-usage')
  @UseGuards(JwtAuthGuard)
  async getPedalUsage(
    @Req() req: AuthRequest,
    @Query('populateUser') populateUser: boolean
  ) {
    return this.pedalService.findAllPedalUsage(req.user?._id, populateUser);
  }

  @Post('/pedal-usage')
  @UseGuards(JwtAuthGuard)
  async createPedalUsage(
    @Req() req: AuthRequest,
    @Body() createPedalUsageDto: any
  ) {
    return this.pedalService.createPedalUsage(
      createPedalUsageDto,
      req.user?._id
    );
  }
}
