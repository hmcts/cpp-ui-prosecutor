import { NgModule } from '@angular/core';
import { PdkCoreModule, PdkDateInputModule, PdkFormModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { FromToDatesModule } from './from-to-dates/from-to-dates.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PdkCoreModule, PdkFormModule, PdkDateInputModule],
  exports: [FromToDatesModule, PdkCoreModule]
})
export class SharedModule {}
