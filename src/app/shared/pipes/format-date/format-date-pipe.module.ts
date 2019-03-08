import { NgModule } from '@angular/core';
import { FormatDatePipe } from './format-date.pipe';

@NgModule({
  declarations: [FormatDatePipe],
  exports: [FormatDatePipe]
})
export class FormatDatePipeModule {}
