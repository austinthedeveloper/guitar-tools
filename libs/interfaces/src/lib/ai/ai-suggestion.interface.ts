export interface AiSettingsResponse {
  amp: {
    name: string;
    settings: Record<string, number>; // Knobs can vary
  };
  pedals: AiPedalSettings[];
  suggestedPedals: AiPedalSettings[];
  notes: string;
}

export interface AiPedalSettings {
  name: string;
  settings: Record<string, number>; // Pedals can have different knob names
}
