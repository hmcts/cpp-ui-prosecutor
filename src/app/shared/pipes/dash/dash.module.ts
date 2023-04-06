import { NgModule } from '@angular/core';
import { DashPipe } from './dash.pipe';

@NgModule({
  declarations: [DashPipe],
  exports: [DashPipe]
})
export class DashPipeModule {}
