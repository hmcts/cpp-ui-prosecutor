import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseNotesComponent } from '../case-notes.component';
import { CommonModule } from '@angular/common';
import { PdkDividerModule, PdkGridModule, PdkFoldableTextModule } from '@cpp/pdk';
import { FormatDatePipeModule, FirstLastNamePipeModule } from 'src/app/shared/pipes';
import { MOCK_CASE_NOTES, MOCK_CASE_MANAGEMENT_NOTES } from 'src/app/case-overview/__tests__/test-mock-data';

describe('Case note component', () => {
  let fixture: ComponentFixture<CaseNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseNotesComponent],
      imports: [PdkFoldableTextModule, CommonModule, PdkDividerModule, PdkGridModule, FormatDatePipeModule, FirstLastNamePipeModule]
    });
    fixture = TestBed.createComponent(CaseNotesComponent);
  });

  it('should display case notes', () => {
    fixture.componentInstance.caseNotes = MOCK_CASE_NOTES;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    expect(fixture.debugElement.nativeElement.innerHTML).toContain(MOCK_CASE_NOTES.notes[0].noteText);
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('General note');
  });

  it('should display the correct note type', () => {
    fixture.componentInstance.caseNotes = MOCK_CASE_MANAGEMENT_NOTES;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('Case management note');
    expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('General note');
  });
});
