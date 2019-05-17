import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkCoreModule, PdkGridModule, PdkRelatedModule } from '@cpp/pdk';
import { DocumentUploadErrorListComponent } from '../document-upload-error-list.component';
import { UploadStatusPipeModule } from '../../../../shared/pipes';

describe('DocumentUploadErrorListComponent', () => {
  let fixture: ComponentFixture<DocumentUploadErrorListComponent>;
  let component: DocumentUploadErrorListComponent;

  const mockErrors = [
    {
      documentType: 'SJPN',
      documentFilename: 'SMITH_SULLIVAN_TFL35072FPS2E_SJPN.pdf',
      validationMessageKey: 'Already sent to court – remove'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentUploadErrorListComponent],
      imports: [PdkCoreModule, PdkGridModule, PdkRelatedModule, UploadStatusPipeModule]
    });
    fixture = TestBed.createComponent(DocumentUploadErrorListComponent);
    component = fixture.componentInstance;
  });

  it('should compile correctly', () => {
    component.documentUploadErrors = mockErrors;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
