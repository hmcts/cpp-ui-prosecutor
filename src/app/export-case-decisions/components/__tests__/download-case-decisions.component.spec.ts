import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CaseCountResult } from '../../../contexts/mi-report';
import { DownloadCaseDecisionsComponent } from '../download-case-decisions.component';

describe('DownloadCaseDecisionsComponent', () => {
  let fixture: ComponentFixture<TestDownloadCaseDecisionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestDownloadCaseDecisionsComponent, DownloadCaseDecisionsComponent],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(TestDownloadCaseDecisionsComponent);
  });

  it('should compile correctly with case count results', () => {
    fixture.componentInstance.caseCountResult = {
      casesResultedCount: 13,
      fromDate: '2019-10-01',
      toDate: '2019-10-10'
    } as CaseCountResult;

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with zero cases', () => {
    fixture.componentInstance.caseCountResult = {
      casesResultedCount: 0,
      fromDate: '2019-10-01',
      toDate: '2019-10-10'
    } as CaseCountResult;

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'download-case-decisions-test',
    template: `
      <download-case-decisions [role]="role" [caseCountResult]="caseCountResult"></download-case-decisions>
    `,
    imports: [DownloadCaseDecisionsComponent]
  })
  class TestDownloadCaseDecisionsComponent {
    role: string;
    caseCountResult: CaseCountResult;
  }
});
