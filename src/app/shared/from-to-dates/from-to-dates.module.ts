import { NgModule } from '@angular/core';
import { PdkCoreModule, PdkDateInputModule, PdkFormModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { FromToDatesComponent } from './from-to-dates.component';
import { MaxDaysDirective } from './max-days.directive';

const DECLARATIONS = [FromToDatesComponent, MaxDaysDirective];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [CommonModule, PdkCoreModule, PdkFormModule, PdkDateInputModule],
  exports: [...DECLARATIONS]
})
export class FromToDatesModule {}
