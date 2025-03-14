import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiSuggestionPayload } from '../../models';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('suggest-settings')
  async suggestSettings(
    @Body()
    payload: AiSuggestionPayload
  ) {
    return this.aiService.getSuggestedSettings(payload);
  }
}
