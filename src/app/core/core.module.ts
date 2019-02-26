import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout.component';
import { AppContainer } from './containers/app.container';
import { PdkCoreModule, PdkCppPatternModule } from '@cpp/pdk';
import { ContextsModule } from '../contexts/contexts.module';

const DECLARATIONS = [LayoutComponent, AppContainer];

@NgModule({
  imports: [CommonModule, PdkCoreModule, PdkCppPatternModule, RouterModule, ContextsModule],
  declarations: [...DECLARATIONS],
  exports: [AppContainer]
})
export class CoreModule {}
