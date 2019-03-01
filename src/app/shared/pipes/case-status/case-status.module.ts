import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseStatusPipe } from './case-status.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [CaseStatusPipe],
  exports: [CaseStatusPipe]
})
export class CaseStatusPipeModule {}
