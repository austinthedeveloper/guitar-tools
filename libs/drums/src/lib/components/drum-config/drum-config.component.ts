import { Component, Inject, OnInit } from '@angular/core';
import {
  MIDI_INPUT,
  MIDI_SUPPORT,
  MIDI_MESSAGES,
  inputById,
  outputByName,
  MIDI_ACCESS,
  MIDI_OUTPUT,
} from '@ng-web-apis/midi';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { DrumKeyPress } from '../../interfaces';
import { DrumKeyService } from '../../services';
import MIDIInput = WebMidi.MIDIInput;
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;
import MIDIAccess = WebMidi.MIDIAccess;
import MIDIOutput = WebMidi.MIDIOutput;

@Component({
    selector: 'guitar-drum-config',
    templateUrl: './drum-config.component.html',
    styleUrls: ['./drum-config.component.css'],
    providers: [inputById('input-0'), outputByName('VirtualMIDISynth')],
    standalone: false
})
export class DrumConfigComponent {
  activeInput$: Observable<DrumKeyPress> = this.drumKeyService.activeInput$;
  inputs$: Observable<DrumKeyPress[]> = this.drumKeyService.inputs$;
  inputRows$: Observable<DrumKeyPress[][]> = this.drumKeyService.inputRows$;
  constructor(
    @Inject(MIDI_SUPPORT) readonly supported: boolean,
    @Inject(MIDI_ACCESS) access: Promise<MIDIAccess>,
    @Inject(MIDI_MESSAGES) messages$: Observable<MIDIMessageEvent>,
    @Inject(MIDI_INPUT) readonly input: Promise<MIDIInput>,
    @Inject(MIDI_OUTPUT) output: Promise<MIDIOutput>,
    private drumKeyService: DrumKeyService
  ) {
    messages$
      .pipe(
        filter((res) => !!(res && res.data.length === 3 && res.data[2] !== 0))
      )
      // .pipe(first())
      .subscribe((res) => {
        const key = res.data[1];
        const hardness = res.data[2];
        this.drumKeyService.addInput({
          key,
          hardness,
          timestamp: res.timeStamp,
        });

        console.log('message sub', res, res.data, res.data.length, {
          key,
          hardness,
          timestamp: res.timeStamp,
        });
      });
    console.log('hit', messages$, input);
    access.then((res) => {
      console.log('access', res, res.inputs.values);
    });
    input.then(
      (res) => {
        console.log('then', res);
      },
      (err) => {
        console.log('thenerr', err);
      }
    );
    output.then((res) => {
      console.log('thoutputen', res);
    });
  }
}
