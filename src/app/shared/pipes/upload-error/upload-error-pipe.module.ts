import { NgModule } from '@angular/core';
import { UploadErrorPipe } from './upload-error.pipe';

@NgModule({
  declarations: [UploadErrorPipe],
  exports: [UploadErrorPipe]
})
export class UploadErrorPipeModule {}
