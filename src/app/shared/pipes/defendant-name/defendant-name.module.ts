import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefendantNamePipe } from './defendant-name.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [DefendantNamePipe],
  exports: [DefendantNamePipe]
})
export class DefendantNamePipeModule {}
