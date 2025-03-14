import { AiSuggestionPayload } from '@guitar/interfaces';
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

  async getSuggestedSettings(payload: AiSuggestionPayload) {
    const prompt = this.generatePrompt(payload);

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4', // or 'gpt-3.5-turbo' for faster response
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const result = response.choices[0]?.message?.content;
    return result ? JSON.parse(result) : {};
  }

  private generatePrompt({
    amp,
    pedals,
    genre,
    referenceTone,
    pickup,
  }: AiSuggestionPayload) {
    // const mappedPedals = pedals.map(pedal => pedal.)
    return `I have a guitar setup with the following gear:
    - Amp: ${amp}
    - Pedals: ${pedals.join(', ')}
    - Guitar Pickup: ${pickup}

    Can you suggest amp and pedal settings in JSON format for a great tone?
    ${genre ? `Make it suitable for ${genre} music.` : ''}
    ${referenceTone ? `Try to match the tone of ${referenceTone}.` : ''}

    The number scale is 0-100

    Respond ONLY with JSON in this structure. Some amps and pedals can have more or less knobs.
    If you can't match the pedal, treat the pedal as the defined type.
    Suggested Pedals should only be populated if there are additional pedals needed for a sound
    The on property should be true if the pedal is going to be used for this genre/reference tone.
    ### **Amp Knob Type Clarification**
    By default, all Knobs are 0-100 values. Types like "Input X" and "Overdrive" are boolean
    ### **Suggested Pedal Type Clarification**
    Each pedal should include a "type" field that describes its category.
    Common types include:
    - **Overdrive**
    - **Distortion**
    - **Fuzz**
    - **Reverb**
    - **Delay**
    - **Equalizer**
    - **Modulation Effects** (e.g., Chorus, Flanger, Phaser)
    - **Compressor**
    - **Tremolo**
    {
      "amp": {
        "name": "${amp}",
        "settings": { "Knob": x... }
      },
      "pedals": [
        { "name": "Pedal Name", on: boolean, type: FROM_PEDAL_TYPE, "settings": { "Knob1": X, "Knob2": X, "Knob3": X } }
      ],
      "suggestedPedals": [
        { "name": "Pedal Name", "type":"Pedal Type" "settings": { "Knob1": X, "Knob2": X, "Knob3": X } }
      ],
      "notes": "Tone description here."
    }
    `;
  }
}
