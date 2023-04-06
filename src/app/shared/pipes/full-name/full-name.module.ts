import { NgModule } from '@angular/core';
import { FullNamePipe } from './full-name.pipe';

@NgModule({
  declarations: [FullNamePipe],
  exports: [FullNamePipe]
})
export class FullNamePipeModule {}
