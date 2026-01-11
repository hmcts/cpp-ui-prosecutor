import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { PdkButtonDirective } from '@cpp/pdk';

@Component({
    selector: 'dev-tools-back',
    template: `
    <button pdk-button (click)="goBack()">
      Back
    </button>
  `,
  imports: [PdkButtonDirective]
})
export class DevToolsBackButtonComponent {
  private location = inject(Location);

  constructor() {}

  goBack() {
    this.location.back();
  }
}
