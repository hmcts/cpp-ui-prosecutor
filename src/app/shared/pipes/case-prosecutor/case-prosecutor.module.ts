import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseProsecutorPipe } from './case-prosecutor.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [CaseProsecutorPipe],
  exports: [CaseProsecutorPipe]
})
export class CaseProsecutorPipeModule {}
