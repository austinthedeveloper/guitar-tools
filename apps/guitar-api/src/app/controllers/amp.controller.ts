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
import { AmpService } from '../services';
import { AuthRequest } from '../models';

@Controller('amps')
export class AmpController {
  constructor(private readonly ampService: AmpService) {}

  @Post()
  async create(@Req() req: AuthRequest, @Body() ampData: any) {
    return this.ampService.create({
      ...ampData,
      createdById: req.user?._id,
    });
  }

  @Get()
  async findAll(
    @Req() req: AuthRequest,
    @Query('populateUser') populateUser: boolean
  ) {
    return this.ampService.findAll(req.user?._id, populateUser);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ampService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() ampData: any) {
    return this.ampService.update(id, ampData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ampService.delete(id);
  }

  @Get('/knobs')
  async getKnobs() {
    return this.ampService.getKnobs();
  }
  @Post('/use')
  async useAmp(@Body() ampUsageData: any) {
    return this.ampService.useAmp(ampUsageData);
  }

  @Get('/use/:id')
  async getAmpUsage(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.ampService.getAmpUsage(id);
  }
}
