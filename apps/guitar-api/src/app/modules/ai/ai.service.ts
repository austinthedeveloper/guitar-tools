import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Store this in .env
    });
  }

  async getSuggestedSettings(
    amp: string,
    pedals: string[],
    genre?: string,
    referenceTone?: string
  ) {
    const prompt = this.generatePrompt(amp, pedals, genre, referenceTone);

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4', // or 'gpt-3.5-turbo' for faster response
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const result = response.choices[0]?.message?.content;
    return result ? JSON.parse(result) : {};
  }

  private generatePrompt(
    amp: string,
    pedals: string[],
    genre?: string,
    referenceTone?: string
  ) {
    return `I have a guitar setup with the following gear:
    - Amp: ${amp}
    - Pedals: ${pedals.join(', ')}

    Can you suggest amp and pedal settings in JSON format for a great tone?
    ${genre ? `Make it suitable for ${genre} music.` : ''}
    ${referenceTone ? `Try to match the tone of ${referenceTone}.` : ''}

    The number scale is 0-100

    Respond ONLY with JSON in this structure. Some amps and pedals can have more or less knobs. If you can't match the pedal, treat the pedal as the defined type. Only include the pedal name in the return response, not the type. Suggested Pedals should only be populated if there are additional pedals needed for a sound:
    {
      "amp": {
        "name": "${amp}",
        "settings": { "knob": x... }
      },
      "pedals": [
        { "name": "Pedal Name", "settings": { "Knob1": X, "Knob2": X, "Knob3": X } }
      ],
      "suggestedPedals": [
        { "name": "Pedal Name", "settings": { "Knob1": X, "Knob2": X, "Knob3": X } }
      ],
      "notes": "Tone description here."
    }
    `;
  }
}
