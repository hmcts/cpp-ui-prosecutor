import { NgModule } from '@angular/core';
import { MiReportModule } from './mi-report/mi-report.module';
import { SjpModule } from './sjp/sjp.module';
import { StagingTflModule } from './staging-tfl';
import { ReferenceDataModule } from './reference-data/reference-data.module';

@NgModule({
  exports: [MiReportModule, SjpModule, StagingTflModule, ReferenceDataModule]
})
export class ContextsModule {}
