import { NgModule } from '@angular/core';
import { PCFReferenceDataOffenceService } from './pcf-reference-data-offence';
import { ReferenceDataService } from './reference-data.service';

@NgModule({
  providers: [ReferenceDataService, PCFReferenceDataOffenceService]
})
export class ReferenceDataModule {}
