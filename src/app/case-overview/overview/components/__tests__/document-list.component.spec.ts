import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { MOCK_CASE } from '../../../__tests__/test-mock-data';
import { DocumentListComponent } from '../document-list.component';
import { CaseDocument } from '../../../../contexts/sjp';
import { DownloadDocumentComponent } from '../../../common/download-document/download-document.component';
import { provideCppCoreHttpServices } from '@cpp/core';
import { provideStore } from '@ngrx/store';

describe('DocumentListComponent', () => {
  let fixture: ComponentFixture<TestDocumentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DocumentListComponent, MockDownloadDocumentComponent, TestDocumentListComponent],
      providers: [provideCppCoreHttpServices(), provideStore()],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(TestDocumentListComponent);
    fixture.componentInstance.documents = MOCK_CASE.caseDocuments;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'document-list-test',
    template: `
      <document-list [documents]="documents"> </document-list>
    `,
    imports: [DocumentListComponent, DownloadDocumentComponent]
  })
  class TestDocumentListComponent {
    documents: CaseDocument[];
  }

  @Component({
    selector: 'download-document',
    template: `
      {{ document | json }}
      {{ caseId }}
    `
  })
  class MockDownloadDocumentComponent {
    @Input() document: CaseDocument;
    @Input() caseId: string;
  }
});
