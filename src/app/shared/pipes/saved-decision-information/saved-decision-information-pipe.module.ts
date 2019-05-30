import { NgModule } from '@angular/core';
import { SavedDecisionInformationPipe } from './saved-decision-information.pipe';

@NgModule({
  declarations: [SavedDecisionInformationPipe],
  exports: [SavedDecisionInformationPipe]
})
export class SavedDecisionInformationPipeModule {}
