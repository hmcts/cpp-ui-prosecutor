import { Component } from '@angular/core';
import { UploadFailurePageComponent } from '../../shared/upload-failure-page/upload-failure-page.component';

@Component({
  selector: 'upload-failure-container',
  template: `
    <upload-failure-page></upload-failure-page>
  `,
  imports: [UploadFailurePageComponent]
})
export class UploadFailureContainer {}
