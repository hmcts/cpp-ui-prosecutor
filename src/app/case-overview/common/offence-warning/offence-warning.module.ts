import { NgModule } from '@angular/core';
import { OffenceWarningComponent } from './offence-warning.component';
import { PdkCoreModule, PdkFormModule } from '@cpp/pdk';

@NgModule({
  declarations: [OffenceWarningComponent],
  imports: [PdkCoreModule, PdkFormModule],
  exports: [OffenceWarningComponent]
})
export class OffenceWarningModule {}
