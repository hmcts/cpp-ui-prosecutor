import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateOfBirthComponent } from './date-of-birth.component';
import { AgePipeModule, FormatDatePipeModule } from '../pipes';

@NgModule({
  declarations: [DateOfBirthComponent],
  imports: [CommonModule, AgePipeModule, FormatDatePipeModule],
  exports: [DateOfBirthComponent]
})
export class DateOfBirthModule {}
