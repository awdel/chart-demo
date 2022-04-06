import { Component, OnInit } from '@angular/core';

import { Payload } from '@interfaces/payload';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  payload!: Payload;
  clearFormEvent: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
  }

  payloadChange(payload: Payload) {
    this.payload = payload;
  }

  clearForm() {
    // this.payload = undefined;
    this.clearFormEvent.next();
  }

}
