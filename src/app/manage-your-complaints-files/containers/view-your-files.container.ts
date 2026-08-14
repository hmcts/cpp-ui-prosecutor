import { Component } from '@angular/core';
import { ViewYourFilesComponent } from '../components/view-your-files/view-your-files.component';

@Component({
  selector: 'view-your-files-container',
  template: `
    <view-your-files></view-your-files>
  `,
  styles: [],
  imports: [ViewYourFilesComponent]
})
export class ViewYourFilesContainer {}
