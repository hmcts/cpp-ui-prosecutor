import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PdkCoreModule, PdkFileDownloadIconModule, PdkGridModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { DownloadDocumentComponent } from '../download-document.component';
import { MOCK_CASE } from '../../../__tests__/test-mock-data';
import { DocFileNamePipe } from '../doc-file-name.pipe';
import { FormatDatePipeModule } from '../../../../shared/pipes';
import { CaseDocument, SjpService } from '../../../../contexts/sjp';

describe('DownloadDocumentComponent', () => {
  let fixture: ComponentFixture<TestDownloadDocumentComponent>;
  const getDocument = jest.fn(() => of(null));
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadDocumentComponent, TestDownloadDocumentComponent, DocFileNamePipe],
      imports: [CommonModule, PdkCoreModule, PdkGridModule, FormatDatePipeModule, PdkFileDownloadIconModule],
      providers: [
        DocFileNamePipe,
        {
          provide: SjpService,
          useValue: {
            getDocument
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(TestDownloadDocumentComponent);
    fixture.componentInstance.document = MOCK_CASE.caseDocuments[0];
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should download the doc', () => {
    fixture.detectChanges();
    fixture.debugElement.query(By.css('a')).nativeElement.click();
    expect(getDocument).toHaveBeenCalled();
  });

  @Component({
    selector: 'download-document-test',
    template: `
      <download-document [document]="document"> </download-document>
    `
  })
  class TestDownloadDocumentComponent {
    document: CaseDocument;
  }
});
