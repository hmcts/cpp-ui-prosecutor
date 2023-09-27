import { NgModule } from '@angular/core';
import { EmploymentStatusPipe } from './employment-status.pipe';

@NgModule({
  declarations: [EmploymentStatusPipe],
  exports: [EmploymentStatusPipe]
})
export class EmploymentStatusModule {}
