import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseNotesComponent } from '../case-notes.component';
import { MOCK_CASE_NOTES, MOCK_CASE_MANAGEMENT_NOTES } from '../../../__tests__/test-mock-data';
import { FormatDatePipe } from '../../../../shared/pipes/format-date/format-date.pipe';
import { FirstLastNamePipe } from '../../../../shared/pipes/first-last-name/first-last-name.pipe';

describe('Case note component', () => {
  let fixture: ComponentFixture<CaseNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormatDatePipe, FirstLastNamePipe, CaseNotesComponent],
      teardown: { destroyAfterEach: false }
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
