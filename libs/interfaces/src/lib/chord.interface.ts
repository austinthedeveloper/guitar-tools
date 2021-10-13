import { PressInterface } from "./press.interface";
import {generateId} from '@guitar/helpers'

export interface ChordInterface {
  fret: string;
  presses: PressInterface[];
  id: string;
  name: string;
  position?: string;
  type?: string;
}
export type ChordPressType = 'pressed' | 'muted';

export class ChordClass implements ChordInterface{
  fret = '';
  position = '';
  name = '';
  type = 'pressed';
  presses: PressInterface[] = [];
  id = generateId();
  constructor(name: string, fret?: string,
  presses?: PressInterface[], position?: string, type?: string) {
    this.name = name;
    if(fret) {
      this.fret = fret;
    }
    if(presses) {
      this.presses = presses;
    }
    if(position) {
      this.position = position;
    }
    if(type) {
      this.type = type;
    }
  }
}
