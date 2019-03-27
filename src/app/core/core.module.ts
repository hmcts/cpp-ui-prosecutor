import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout.component';
import { AppContainer } from './containers/app.container';
import { PdkCoreModule, PdkCppPatternModule } from '@cpp/pdk';
import { ContextsModule } from '../contexts/contexts.module';
import { AppRouterContainer } from './containers/app.router.container';

const DECLARATIONS = [LayoutComponent, AppContainer, AppRouterContainer];

@NgModule({
  imports: [CommonModule, PdkCoreModule, PdkCppPatternModule, RouterModule, ContextsModule],
  declarations: [...DECLARATIONS],
  exports: [AppContainer]
})
export class CoreModule {}
