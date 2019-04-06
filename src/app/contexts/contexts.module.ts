import { NgModule } from '@angular/core';
import { MiReportModule } from './mi-report/mi-report.module';
import { SjpModule } from './sjp/sjp.module';
import { StagingTflModule } from './staging-tfl';

@NgModule({
  exports: [MiReportModule, SjpModule, StagingTflModule]
})
export class ContextsModule {}
