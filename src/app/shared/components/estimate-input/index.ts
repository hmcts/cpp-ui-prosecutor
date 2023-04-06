import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstimateInput } from './estimate-input';
import { PdkFormModule, PdkTextInputModule } from '@cpp/pdk';

const EXPORTED_DECLARATIONS = [EstimateInput];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PdkFormModule, PdkTextInputModule],
  exports: [EXPORTED_DECLARATIONS],
  declarations: [EXPORTED_DECLARATIONS],
})
export class EstimateInputModule {}

export * from './estimate-input';
