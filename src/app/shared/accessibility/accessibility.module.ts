import { NgModule } from '@angular/core';

import { AccessibilityComponent } from './accessibility.component';
import { RouterModule, Routes } from '@angular/router';
import { PdkCoreModule, PdkGridModule, } from '@cpp/pdk';
import { SharedModule } from '../shared.module';

const routes: Routes = [
  {
    path: '',
    component: AccessibilityComponent,
    data: { title: 'Accessibility | Common platform'}
  }
];
const DECLARATIONS = [AccessibilityComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    RouterModule.forChild(routes),
    RouterModule,
    PdkCoreModule,
    PdkGridModule,
    SharedModule,
  ],
  exports: [...DECLARATIONS]
})
export class AccessibilityModule {}
