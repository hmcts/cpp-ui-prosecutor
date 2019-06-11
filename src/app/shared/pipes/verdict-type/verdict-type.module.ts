import { NgModule } from '@angular/core';
import { VerdictTypePipe } from './verdict-type.pipe';

@NgModule({
  declarations: [VerdictTypePipe],
  exports: [VerdictTypePipe]
})
export class VerdictTypePipeModule {}
