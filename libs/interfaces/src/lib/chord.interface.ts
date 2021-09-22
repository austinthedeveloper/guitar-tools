import { PressInterface } from "./press.interface";
import {generateId} from '@guitar/helpers'

export interface ChordInterface {
  fret: string;
  presses: PressInterface[];
  id: string;
  name: string;
  position?: string;
}

export class ChordClass implements ChordInterface{
  fret = '';
  position = '1';
  name = '';
  presses: PressInterface[] = [];
  id = generateId();
  constructor(name: string, fret?: string,
  presses?: PressInterface[], position?: string) {
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
  }
}
