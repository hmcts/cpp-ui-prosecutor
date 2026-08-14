import { CaseNotes } from '../../../contexts/sjp';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { PdkFoldableTextComponent, PdkDividerComponent, PdkCore, PdkGrid } from '@cpp/pdk';
import { FormatDatePipe } from '../../../shared/pipes/format-date/format-date.pipe';
import { FirstLastNamePipe } from '../../../shared/pipes/first-last-name/first-last-name.pipe';

@Component({
  selector: 'case-notes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-grid container>
      <pdk-grid>
        <div>
          @for (caseNote of caseNotes.notes; track caseNote.noteId; let last = $last) {
          <div>
            <div pdk-margin-left="2">
              <div pdk-typography="heading-medium">
                {{ checkCaseNoteType(caseNote.noteType) }}
                <br />
                <span pdk-text-colour="dark-grey" pdk-typography="body-medium">
                  {{ caseNote.addedAt | formatDate: 'd MMMM y' }} at {{ caseNote.addedAt | formatDate: 'h:mma' }} by
                  {{
                    { firstName: caseNote.authorFirstName, lastName: caseNote.authorLastName }
                      | firstLastName: false:false
                  }}
                </span>
              </div>
              <pdk-foldable-text pdk-typography="body-medium">
                {{ caseNote.noteText }}
              </pdk-foldable-text>
            </div>
            @if (!last) {
            <pdk-divider></pdk-divider>
            }
          </div>
          }
        </div>
      </pdk-grid>
    </pdk-grid>
  `,
  imports: [PdkCore, PdkFoldableTextComponent, PdkDividerComponent, PdkGrid, FormatDatePipe, FirstLastNamePipe]
})
export class CaseNotesComponent {
  changeRef = inject(ChangeDetectorRef);

  @Input() caseNotes: CaseNotes;

  constructor() {}

  checkCaseNoteType(caseNote: string) {
    return caseNote === 'CASE_MANAGEMENT' ? 'Case management note' : 'General note';
  }
}
