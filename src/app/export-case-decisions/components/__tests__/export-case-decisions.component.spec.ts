import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExportCaseDecisionsComponent } from '../export-case-decisions.component';
import { CaseCountResult } from '../../../contexts/mi-report';
import { ValidationError } from '@cpp/pdk/form/form.interfaces';
import { InputValues } from '../../../shared/from-to-dates/from-to-dates.component';
import { By } from '@angular/platform-browser';
import { JsonPipe } from '@angular/common';
import { DownloadCaseDecisionsComponent } from '../download-case-decisions.component';
import { ExportCaseDecisionsFormComponent } from '../export-case-decisions-form.component';

describe('ExportCaseDecisionsComponent', () => {
  let fixture: ComponentFixture<TestExportCaseDecisionsComponent>;
  let form;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          MockExportCaseDecisionsFormComponent,
          MockDownloadCaseDecisionsFormComponent,
          TestExportCaseDecisionsComponent,
          ExportCaseDecisionsComponent
        ],
        teardown: { destroyAfterEach: false }
      }).overrideComponent(ExportCaseDecisionsComponent, {
        remove: {
          imports: [ExportCaseDecisionsFormComponent, DownloadCaseDecisionsComponent]
        },
        add: {
          imports: [MockExportCaseDecisionsFormComponent, MockDownloadCaseDecisionsFormComponent]
        }
      });
      fixture = TestBed.createComponent(TestExportCaseDecisionsComponent);
      fixture.detectChanges();
      form = fixture.debugElement.query(By.directive(MockExportCaseDecisionsFormComponent));
    })
  );

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
    fixture.detectChanges();
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
    `,
    imports: [ExportCaseDecisionsComponent]
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
    `,
    imports: [JsonPipe]
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
