import { NgModule } from '@angular/core';
import { MiReportModule } from './mi-report/mi-report.module';
import { SjpModule } from './sjp/sjp.module';

@NgModule({
  exports: [MiReportModule, SjpModule]
})
export class ContextsModule {}
