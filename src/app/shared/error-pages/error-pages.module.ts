import { NgModule } from '@angular/core';
import { PdkButtonModule, PdkCoreModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { TechnicalErrorComponent } from './technical-error.component';
import { RouterModule } from '@angular/router';
import { BackButtonComponent } from './back-button.component';

@NgModule({
  declarations: [BackButtonComponent, TechnicalErrorComponent],
  imports: [CommonModule, RouterModule, PdkCoreModule, PdkButtonModule],
  exports: [TechnicalErrorComponent]
})
export class ErrorPagesModule {}
