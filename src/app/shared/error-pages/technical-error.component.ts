import { Component } from '@angular/core';

@Component({
  selector: 'technical-error',
  template: `
    <back-button></back-button>
    <h1 pdk-typography="heading-xlarge">
      <span pdk-typography="caption-large">Technical error</span>
      There was a problem
    </h1>
    <div>
      <p pdk-typography="body-small">
        Check you’ve entered the web address correctly or <a [routerLink]="['/']" pdk-link>go to the home page</a>
        - any unsaved changes may be lost.
      </p>
    </div>
  `
})
export class TechnicalErrorComponent {}
