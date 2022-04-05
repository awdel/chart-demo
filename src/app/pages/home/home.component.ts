import { Component, OnInit } from '@angular/core';

import { Payload } from '@interfaces/payload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  payload?: Payload;

  constructor() { }

  ngOnInit(): void {
  }

  payloadChangeEvent(payload: Payload) {
    this.payload = payload;
  }

}
