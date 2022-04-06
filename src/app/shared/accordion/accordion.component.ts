import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { AccordionPanelComponent } from './accordion-panel/accordion-panel.component';

@Component({
  selector: 'accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements AfterContentInit {
  @ContentChildren(AccordionPanelComponent) panels!: QueryList<AccordionPanelComponent>;

  constructor() { }

  ngAfterContentInit() {
    // Open the first panel
    //this.panels.toArray()[0].opened = true;
    // Loop through all panels
    this.panels.toArray().forEach((panel) => {
      // subscribe panel toggle event
      panel.toggle.subscribe(() => {
        // Open the panel
        if (!panel.opened) {
          this.openPanel(panel);
        }
        else {
          this.closePanel(panel);
        }
      });
    });
  }

  openPanel(panel: AccordionPanelComponent) {
    // close all panels
    this.panels.toArray().forEach(p => p.opened = false);
    // open the selected panel
    panel.opened = true;
  }

  closePanel(panel: AccordionPanelComponent) {
    // close the selected panel
    panel.opened = false;
  }

}
