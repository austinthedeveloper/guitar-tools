import { Component, Inject, OnInit } from '@angular/core';
import {
  MIDI_INPUT,
  MIDI_SUPPORT,
  MIDI_MESSAGES,
  inputById,
  outputByName,
} from '@ng-web-apis/midi';
import { Observable } from 'rxjs';
import MIDIInput = WebMidi.MIDIInput;
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

@Component({
  selector: 'guitar-drum-config',
  templateUrl: './drum-config.component.html',
  styleUrls: ['./drum-config.component.css'],
  providers: [
    inputById('input-0'),
    // , outputByName('VirtualMIDISynth')
  ],
})
export class DrumConfigComponent implements OnInit {
  constructor(
    @Inject(MIDI_SUPPORT) readonly supported: boolean,
    @Inject(MIDI_MESSAGES) messages$: Observable<MIDIMessageEvent>,
    @Inject(MIDI_INPUT) private input: Promise<MIDIInput>
  ) {
    console.log('hit', messages$, this.input);
  }

  ngOnInit(): void {
    // this.input.then((res) => {
    //   console.log('hit', res);
    // });
  }
}
