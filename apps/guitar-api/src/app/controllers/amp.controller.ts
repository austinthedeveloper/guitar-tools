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
import { AmpService } from '../services';
import { AuthRequest } from '../models';
import { JwtAuthGuard } from '../guards';
import { ParseObjectIdPipe } from '../pipes';

@Controller('amps')
export class AmpController {
  constructor(private readonly ampService: AmpService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req: AuthRequest, @Body() ampData: any) {
    return this.ampService.create({
      ...ampData,
      createdById: req.user?._id,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Req() req: AuthRequest,
    @Query('populateUser') populateUser: boolean
  ) {
    return this.ampService.findAll(req.user?._id, populateUser);
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.ampService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() ampData: any
  ) {
    return this.ampService.update(id, ampData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    return this.ampService.delete(id);
  }

  @Get('/knobs')
  async getKnobs() {
    return this.ampService.getKnobs();
  }
  @Post('/use')
  @UseGuards(JwtAuthGuard)
  async useAmp(@Req() req: AuthRequest, @Body() ampUsageData: any) {
    return this.ampService.createAmpUsage({
      ...ampUsageData,
      createdById: req.user?._id,
    });
  }

  @Get('/use/:id')
  @UseGuards(JwtAuthGuard)
  async getAmpUsage(
    @Req() req: AuthRequest,
    @Param('id', ParseObjectIdPipe) id: string
  ) {
    return this.ampService.useAmp(id);
  }
}
