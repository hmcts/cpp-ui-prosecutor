import { NgModule } from '@angular/core';
import { AgeMockPipe } from './age-mock.pipe';
import { TranslateMockPipe } from './translate-mock.pipe';

@NgModule({
  declarations: [AgeMockPipe, TranslateMockPipe],
  exports: [AgeMockPipe, TranslateMockPipe],
})
export class MockPipesModule {}
