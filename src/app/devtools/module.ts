import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DevToolsDashboardPageComponent } from './dashboard/dashboard.container';
import { DevToolsDashboardComponent } from './dashboard/dashboard.component';
import { DevtoolsSelectUserPageComponent } from './select-user/select-user.container';
import { DevtoolsSelectUserComponent } from './select-user/select-user.component';
import { DevToolsBackButtonComponent } from './back-button/back-button.component';

import { SessionInterceptor } from './interceptors/session';
import { SessionService } from './session/service';
import { PdkButtonModule, PdkCoreModule, PdkFormModule, PdkGridModule, PdkSelectModule } from '@cpp/pdk';

const DECLARATIONS = [
  DevToolsDashboardPageComponent,
  DevToolsDashboardComponent,
  DevtoolsSelectUserPageComponent,
  DevtoolsSelectUserComponent,
  DevToolsBackButtonComponent
];

@NgModule({
  imports: [
    NgCommonModule,
    FormsModule,
    PdkCoreModule,
    PdkGridModule,
    PdkFormModule,
    PdkSelectModule,
    PdkButtonModule,
    RouterModule.forChild([
      {
        path: 'dev-tools',
        data: {
          title: 'Developer Tools'
        },
        component: DevToolsDashboardPageComponent
      },
      {
        path: 'dev-tools/select-user',
        data: {
          title: 'Developer Tools - Select User'
        },
        component: DevtoolsSelectUserPageComponent,
        pathMatch: 'full'
      }
    ])
  ],
  declarations: [DECLARATIONS],
  exports: [DECLARATIONS],
  providers: [
    SessionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionInterceptor,
      multi: true
    }
  ]
})
export class DevToolsModule {}
