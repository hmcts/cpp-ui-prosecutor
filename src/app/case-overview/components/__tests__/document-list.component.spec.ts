import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { PdkCoreModule, PdkGridModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { MOCK_CASE } from '../../__tests__/test-mock-data';
import { DocumentListComponent } from '../document-list.component';
import { CaseDocument } from '../../../contexts/sjp';

describe('DocumentListComponent', () => {
  let fixture: ComponentFixture<TestDocumentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentListComponent, MockDownloadDocument, TestDocumentListComponent],
      imports: [CommonModule, PdkCoreModule, PdkGridModule]
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
    `
  })
  class TestDocumentListComponent {
    documents: CaseDocument[];
  }

  @Component({
    selector: 'download-document',
    template: `
      {{ document | json }}
    `
  })
  class MockDownloadDocument {
    @Input() document: CaseDocument;
  }
});
