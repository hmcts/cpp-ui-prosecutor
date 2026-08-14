import { Component } from '@angular/core';
import { UploadNewFilesComponent } from '../components/upload-new-files/upload-new-files.component';

@Component({
  selector: 'upload-new-files-container',
  template: `
    <upload-new-files></upload-new-files>
  `,
  styles: [],
  imports: [UploadNewFilesComponent]
})
export class UploadNewFilesContainer {}
