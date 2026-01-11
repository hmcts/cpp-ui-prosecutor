import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { DownloadDocumentComponent } from '../download-document.component';
import { MOCK_CASE } from '../../../__tests__/test-mock-data';
import { CaseDocument, SjpService } from '../../../../contexts/sjp';
import { provideHttpClient } from '@angular/common/http';

describe('DownloadDocumentComponent', () => {
  let fixture: ComponentFixture<TestDownloadDocumentComponent>;
  const getDocument = jest.fn(() => of(null));
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestDownloadDocumentComponent, DownloadDocumentComponent],
      providers: [
        provideHttpClient(),
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
    fixture.debugElement.query(By.css('a')).nativeElement.dispatchEvent(new Event('click'));
    expect(getDocument).toHaveBeenCalled();
  });

  @Component({
    selector: 'download-document-test',
    template: `
      <download-document [document]="document"> </download-document>
    `,
    imports: [DownloadDocumentComponent]
  })
  class TestDownloadDocumentComponent {
    document: CaseDocument;
  }
});
