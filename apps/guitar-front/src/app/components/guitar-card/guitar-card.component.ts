import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'guitar-card',
  templateUrl: './guitar-card.component.html',
  styleUrls: ['./guitar-card.component.css'],
})
export class GuitarCardComponent implements OnInit {
  @Input() header: string;

  constructor() {}

  ngOnInit() {}
}
