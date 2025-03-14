export interface AiSuggestionPayload {
  amp: string;
  pedals: string[];
  suggestedPedals: AiPedalSettings[];
  genre?: string;
  pickup?: string;
  referenceTone?: string;
}
export interface AiPedalSettings {
  name: string;
  settings: Record<string, number>; // Pedals can have different knob names
}
