import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PdkPageHeaderModule, PdkBreadcrumbsModule, PdkCoreModule, PdkButtonModule, PdkTableModule } from '@cpp/pdk';
import { OnlinePleaDetailsComponent } from './components/online-plea-details.component';
import { OnlinePleaDetailsContainer } from './online-plea-details.container';
import { CaseHeaderBadgeModule } from '../common/case-header-badge/case-header-badge.module';
import { OnlinePleaGuard } from '../../core/guards/online-plea.guard';
import { BreadcrumbLinksModule } from '../../shared/breadcrumb-links/breadcrumb-links.module';
import { SharedModule } from '../../shared';

const DECLARATIONS = [OnlinePleaDetailsContainer, OnlinePleaDetailsComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    PdkCoreModule,
    PdkButtonModule,
    PdkPageHeaderModule,
    PdkBreadcrumbsModule,
    CaseHeaderBadgeModule,
    PdkTableModule,
    SharedModule,
    BreadcrumbLinksModule,
    RouterModule.forChild([
      {
        path: '',
        component: OnlinePleaDetailsContainer,
        canActivate: [OnlinePleaGuard]
      }
    ])
  ],
  providers: [
    OnlinePleaGuard
  ]
})
export class OnlinePleaDetailsModule {}
