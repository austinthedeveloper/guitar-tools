import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AmpService } from '../services';

@Controller('amps')
export class AmpController {
  constructor(private readonly ampService: AmpService) {}

  @Post()
  async create(@Body() ampData: any) {
    return this.ampService.create(ampData);
  }

  @Get()
  async findAll() {
    return this.ampService.findAll();
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
}
