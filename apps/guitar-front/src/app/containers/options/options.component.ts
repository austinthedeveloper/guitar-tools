import { Component, OnInit } from '@angular/core';
import { UserOptionsInterface } from '@guitar/interfaces';
import { OptionsService } from '@guitar/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'guitar-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class OptionsComponent implements OnInit {
  options$: Observable<UserOptionsInterface> = this.userOptions.options$;
  constructor(private userOptions: OptionsService) {}

  ngOnInit() {}

  optionChanged(options: UserOptionsInterface) {
    this.userOptions.setOption(options);
  }
}
