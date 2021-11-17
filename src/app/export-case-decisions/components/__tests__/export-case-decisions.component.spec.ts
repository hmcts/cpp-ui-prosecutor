import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExportCaseDecisionsComponent } from '../export-case-decisions.component';
import { PdkBreadcrumbsModule, PdkCoreModule, PdkErrorSummaryModule } from '@cpp/pdk';
import { CaseCountResult } from '../../../contexts/mi-report';
import { ValidationError } from '@cpp/pdk/form/form.interfaces';
import { InputValues } from '../../../shared/from-to-dates/from-to-dates.component';
import { By } from '@angular/platform-browser';
import { MockModule } from '../../../shared/mock-components/mock.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExportCaseDecisionsComponent', () => {
  let fixture: ComponentFixture<TestExportCaseDecisionsComponent>;
  let form;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExportCaseDecisionsComponent,
        MockExportCaseDecisionsFormComponent,
        MockDownloadCaseDecisionsFormComponent,
        TestExportCaseDecisionsComponent
      ],
      imports: [RouterTestingModule, PdkBreadcrumbsModule, PdkErrorSummaryModule, PdkCoreModule, MockModule]
    });
    fixture = TestBed.createComponent(TestExportCaseDecisionsComponent);
    form = fixture.debugElement.query(By.directive(MockExportCaseDecisionsFormComponent));
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with case count results', () => {
    fixture.componentInstance.caseCountResult = {
      casesResultedCount: 0,
      fromDate: '2019-10-01',
      toDate: '2019-10-10'
    } as CaseCountResult;

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with errors', () => {
    form.componentInstance.errors.emit([
      {
        id: 'pdk-error-id1',
        message: 'Invalid input'
      }
    ]);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit load case count event', () => {
    fixture.detectChanges();
    const params = {
      fromDate: '2019-10-01',
      toDate: '2019-10-10'
    };
    form.componentInstance.loadCaseCount.emit(params);
    expect(fixture.componentInstance.loadCaseCount).toHaveBeenCalledWith(params);
  });

  @Component({
    selector: 'export-case-decisions-test',
    template: `
      <export-case-decisions [role]="role" [caseCountResult]="caseCountResult" (loadCaseCount)="loadCaseCount($event)">
      </export-case-decisions>
    `
  })
  class TestExportCaseDecisionsComponent {
    role: string;
    caseCountResult: CaseCountResult;
    loadCaseCount = jest.fn();
  }

  @Component({
    selector: 'download-case-decisions',
    template: `
      {{ caseCountResult | json }}
      {{ role | json }}
    `
  })
  class MockDownloadCaseDecisionsFormComponent {
    @Input() role: string;
    @Input() caseCountResult: CaseCountResult;
  }

  @Component({
    selector: 'export-case-decisions-form',
    template: `
      <form></form>
    `
  })
  class MockExportCaseDecisionsFormComponent {
    @Output() loadCaseCount: EventEmitter<InputValues> = new EventEmitter();
    @Output() errors: EventEmitter<ValidationError> = new EventEmitter();
  }
});
