import { NgModule } from '@angular/core';
import { IfEmptyPipe } from './if-empty.pipe';

@NgModule({
  declarations: [IfEmptyPipe],
  exports: [IfEmptyPipe]
})
export class IfEmptyPipeModule {}
