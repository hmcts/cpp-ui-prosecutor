import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationStatusPipe } from './application-status.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ApplicationStatusPipe],
  exports: [ApplicationStatusPipe]
})
export class ApplicationStatusPipeModule {}
