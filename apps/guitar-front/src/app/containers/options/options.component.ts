import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserOptionsInterface } from '@guitar/interfaces';
import { OptionsService } from '@guitar/store';
import { Observable } from 'rxjs';
import { UserOptionsComponent } from '../../components/user-options/user-options.component';

@Component({
  selector: 'guitar-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
  standalone: true,
  imports: [CommonModule, UserOptionsComponent],
})
export class OptionsComponent {
  options$: Observable<UserOptionsInterface> = this.userOptions.options$;
  constructor(private userOptions: OptionsService) {}

  optionChanged(options: UserOptionsInterface) {
    this.userOptions.setOption(options);
  }
}
