import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'panel',
  templateUrl: './accordion-panel.component.html',
  styleUrls: ['./accordion-panel.component.scss']
})

export class AccordionPanelComponent {
  @Input() opened = false;
  @Input() title!: string;
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
}
