import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'dev-tools-back',
  template: `
    <button pdk-button (click)="goBack()">
      Back
    </button>
  `
})
export class DevToolsBackButtonComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
