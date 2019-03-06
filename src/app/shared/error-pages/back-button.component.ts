import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'back-button',
  template: `
    <button pdk-button="secondary" type="button" pdk-margin-top="6" (click)="back()">
      Back
    </button>
  `
})
export class BackButtonComponent {
  @Input() linkUrl: string;

  constructor(private router: Router, private location: Location) {}

  back() {
    if (this.linkUrl) {
      this.router.navigate([this.linkUrl]);
    } else {
      this.location.back();
    }
  }
}
