import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkCoreModule, PdkGridModule, PdkRelatedModule } from '@cpp/pdk';
import { ViewCsvUploadReportComponent } from '../view-csv-upload-report.component';
import { IfEmptyPipeModule, UploadErrorPipeModule } from '../../../../shared/pipes';
import { CsvUploadErrorListComponent } from '../csv-upload-error-list.component';

describe('ViewCsvUploadReportComponent', () => {
  let fixture: ComponentFixture<CsvUploadErrorListComponent>;
  let component: CsvUploadErrorListComponent;

  const mockErrors = [
    {
      csvColumn: 'H',
      csvRow: 1,
      tflCaseUrn: 'TFL88932KI14X',
      validationMessageKey: 'DATE_OF_HEARING_WRONG_FORMAT'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsvUploadErrorListComponent],
      imports: [PdkCoreModule, PdkGridModule, PdkRelatedModule, UploadErrorPipeModule, IfEmptyPipeModule]
    });
    fixture = TestBed.createComponent(CsvUploadErrorListComponent);
    component = fixture.componentInstance;
  });

  it('should compile correctly', () => {
    component.csvErrors = mockErrors;
    component.summary = 'Header error list';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
