import { PedalsOnPipe } from './pedals-on.pipe';
import { PedalEntry } from '@guitar/interfaces';

describe('PedalsOnPipe', () => {
  let pipe: PedalsOnPipe;

  beforeEach(() => {
    pipe = new PedalsOnPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return only pedals that are on', () => {
    const pedals = [
      { pedalId: '1', on: true } as PedalEntry,
      { pedalId: '2', on: false } as PedalEntry,
      { pedalId: '3', on: true } as PedalEntry,
    ];

    const result = pipe.transform(pedals);

    expect(result).toEqual([
      { pedalId: '1', on: true } as PedalEntry,
      { pedalId: '3', on: true } as PedalEntry,
    ]);
  });

  it('should return an empty array if all pedals are off', () => {
    const pedals = [
      { pedalId: '1', on: false } as PedalEntry,
      { pedalId: '2', on: false } as PedalEntry,
    ];

    const result = pipe.transform(pedals);

    expect(result).toEqual([]);
  });

  it('should return the same array if all pedals are on', () => {
    const pedals = [
      { pedalId: '1', on: true } as PedalEntry,
      { pedalId: '2', on: true } as PedalEntry,
    ];

    const result = pipe.transform(pedals);

    expect(result).toEqual(pedals);
  });

  it('should return an empty array if input is an empty array', () => {
    const result = pipe.transform([]);
    expect(result).toEqual([]);
  });

  it('should handle undefined or null input gracefully', () => {
    expect(pipe.transform(undefined as any)).toEqual([]);
    expect(pipe.transform(null as any)).toEqual([]);
  });
});
