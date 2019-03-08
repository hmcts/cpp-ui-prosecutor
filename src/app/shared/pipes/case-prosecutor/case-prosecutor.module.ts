import { NgModule } from '@angular/core';
import { CaseProsecutorPipe } from './case-prosecutor.pipe';

@NgModule({
  declarations: [CaseProsecutorPipe],
  exports: [CaseProsecutorPipe]
})
export class CaseProsecutorPipeModule {}
