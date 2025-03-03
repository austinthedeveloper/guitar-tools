import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../guards';
import { AuthRequest } from '../models';
import { AmpUsageService } from '../services/amp-usage.service';

@Controller('amp-usage')
@UseGuards(JwtAuthGuard)
export class AmpUsageController {
  constructor(private readonly ampUsageService: AmpUsageService) {}

  @Get()
  getAllAmpUsages(@Req() req: AuthRequest) {
    const userId = req.user._id;
    return this.ampUsageService.findUserAmpUsages(userId);
  }
  @Post()
  async createAmp(@Req() req: AuthRequest, @Body() ampUsageData: any) {
    return this.ampUsageService.create({
      ...ampUsageData,
      createdById: req.user?._id,
    });
  }

  // ✅ Cleaned up! No need to manually pass `{ _id: id }`
  @Get(':id')
  getAmpUsage(@Param('id') id: string) {
    return this.ampUsageService.getAmpUsageById(id);
  }
}
