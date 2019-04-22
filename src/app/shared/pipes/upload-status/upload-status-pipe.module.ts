import { NgModule } from '@angular/core';
import { UploadStatusPipe } from './upload-status.pipe';

@NgModule({
  declarations: [UploadStatusPipe],
  exports: [UploadStatusPipe]
})
export class UploadStatusPipeModule {}
