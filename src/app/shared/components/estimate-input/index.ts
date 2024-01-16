import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstimateInputComponent } from './estimate-input.component';
import { PdkFormModule, PdkTextInputModule } from '@cpp/pdk';

const EXPORTED_DECLARATIONS = [EstimateInputComponent];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PdkFormModule, PdkTextInputModule],
  exports: [EXPORTED_DECLARATIONS],
  declarations: [EXPORTED_DECLARATIONS]
})
export class EstimateInputModule {}

export * from './estimate-input.component';
