import { CaseNotes } from '../../../contexts/sjp';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'case-notes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-grid container>
      <pdk-grid>
        <div>
          <div *ngFor="let caseNote of caseNotes.notes; let last = last">
            <div pdk-margin-left="2">
              <div pdk-typography="heading-medium">
                {{ checkCaseNoteType(caseNote.noteType) }}
                <br>
                <span pdk-text-colour="grey-1" pdk-typography="body-medium">
                  {{ caseNote.addedAt | formatDate: 'd MMMM y' }} at {{ caseNote.addedAt | formatDate: 'h:mma' }}
                  by {{
                    { firstName: caseNote.authorFirstName, lastName: caseNote.authorLastName }
                    | firstLastName: false:false
                  }}
                </span>
              </div>
              <pdk-foldable-text pdk-typography="body-medium">
                {{ caseNote.noteText }}
              </pdk-foldable-text>
            </div>
            <pdk-divider *ngIf="!last"></pdk-divider>
          </div>
        </div>
      </pdk-grid>
    </pdk-grid>
  `
})
export class CaseNotesComponent {
  @Input() caseNotes: CaseNotes;

  checkCaseNoteType(caseNote: string) {
    return caseNote === 'CASE_MANAGEMENT' ? 'Case management note' : 'General note';
  }
}
