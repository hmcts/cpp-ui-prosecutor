import { Component, Input } from '@angular/core';
import { CaseNotes } from 'src/app/contexts/sjp';

@Component({
  selector: 'case-notes',
  template: `case notes`
})
export class MockCaseNotesComponent {
  @Input() caseNotes: CaseNotes;
}
