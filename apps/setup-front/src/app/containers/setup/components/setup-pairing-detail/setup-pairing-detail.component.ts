import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AmpService,
  PairingService,
  PedalBoardService,
  AmpStore,
  PedalBoardStore,
  PairingStore,
  PedalStore,
} from '@guitar/setup';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'guitar-setup-pairing-detail',
  templateUrl: './setup-pairing-detail.component.html',
  styleUrl: './setup-pairing-detail.component.scss',
})
export class SetupPairingDetailComponent {
  params$ = this.route.params;
  pairing$ = this.params$.pipe(
    map((params) => params['pairingId']),
    switchMap((id) => this.pairingStore.getPairing(id))
  );
  pairings$ = this.pairingStore.pairings$;
  amps$ = this.ampStore.amps$;
  pedalBoards$ = this.pedalBoardStore.pedalBoards$;
  pedals$ = this.pedalStore.pedals$;

  constructor(
    private ampService: AmpService,
    private pairingService: PairingService,
    private pedalBoardService: PedalBoardService,
    private ampStore: AmpStore,
    private pedalBoardStore: PedalBoardStore,
    private pairingStore: PairingStore,
    private pedalStore: PedalStore,
    private route: ActivatedRoute
  ) {}
}
