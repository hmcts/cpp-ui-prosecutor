import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLastNamePipe } from './first-last-name.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FirstLastNamePipe],
  exports: [FirstLastNamePipe]
})
export class FirstLastNamePipeModule {}
