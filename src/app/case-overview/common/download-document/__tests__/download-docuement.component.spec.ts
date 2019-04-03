import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PdkCoreModule, PdkFileDownloadIconModule, PdkGridModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { DownloadDocumentComponent } from '../download-document.component';
import { MOCK_CASE } from '../../../__tests__/test-mock-data';
import { DocFileNamePipe } from '../doc-file-name.pipe';
import { FormatDatePipeModule } from '../../../../shared/pipes';
import { CaseDocument } from '../../../../contexts/sjp';

describe('DownloadDocumentComponent', () => {
  let fixture: ComponentFixture<TestDownloadDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadDocumentComponent, TestDownloadDocumentComponent, DocFileNamePipe],
      imports: [CommonModule, PdkCoreModule, PdkGridModule, FormatDatePipeModule, PdkFileDownloadIconModule],
      providers: [DocFileNamePipe]
    });

    fixture = TestBed.createComponent(TestDownloadDocumentComponent);
    fixture.componentInstance.document = MOCK_CASE.caseDocuments[0];
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
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
