import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('suggest-settings')
  async suggestSettings(
    @Body()
    body: {
      amp: string;
      pedals: string[];
      genre?: string;
      referenceTone?: string;
    }
  ) {
    return this.aiService.getSuggestedSettings(
      body.amp,
      body.pedals,
      body.genre,
      body.referenceTone
    );
  }
}
