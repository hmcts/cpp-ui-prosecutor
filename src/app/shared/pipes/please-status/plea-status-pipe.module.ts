import { NgModule } from '@angular/core';
import { PleaStatusPipe } from './plea-status.pipe';

@NgModule({
  declarations: [PleaStatusPipe],
  exports: [PleaStatusPipe]
})
export class PleaStatusPipeModule {}
