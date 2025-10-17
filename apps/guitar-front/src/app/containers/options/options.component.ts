import { Component } from '@angular/core';
import { UserOptionsInterface } from '@guitar/interfaces';
import { OptionsService } from '@guitar/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'guitar-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.css'],
    standalone: false
})
export class OptionsComponent {
  options$: Observable<UserOptionsInterface> = this.userOptions.options$;
  constructor(private userOptions: OptionsService) {}

  optionChanged(options: UserOptionsInterface) {
    this.userOptions.setOption(options);
  }
}
