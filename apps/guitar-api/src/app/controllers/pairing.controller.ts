import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PairingService } from '../services/pairing.service';
import { AuthRequest } from '../models/auth-request.model';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('pairings')
@UseGuards(JwtAuthGuard)
export class PairingController {
  constructor(private readonly pairingService: PairingService) {}

  /** ✅ Create a pairing */
  @Post()
  async createPairing(
    @Req() req: AuthRequest,
    @Body() body: { ampUsageId: string; pedalBoardId: string }
  ) {
    return this.pairingService.createPairing(
      body.ampUsageId,
      body.pedalBoardId,
      req.user._id
    );
  }

  /** ✅ Get all pairings for the user */
  @Get()
  async getPairings(@Req() req: AuthRequest) {
    return this.pairingService.getPairings(req.user._id);
  }

  @Get(':id')
  async getPairing(@Param('id') id: string) {
    return this.pairingService.getPairing(id);
  }

  /** ✅ Delete a pairing */
  @Delete(':id')
  async deletePairing(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.pairingService.deletePairing(id, req.user._id);
  }
}
