import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routesCaseOverview } from './routes.case-overview';

const DECLARATIONS = [];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule, RouterModule.forChild(routesCaseOverview)],
  providers: [],
  exports: [...DECLARATIONS]
})
export class CaseOverviewModule {}
