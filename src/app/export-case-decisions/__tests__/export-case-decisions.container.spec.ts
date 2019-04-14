import { ExportCaseDecisionsContainer } from '../export-case-decisions.container';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import { reducers, State } from '../../reducers';
import { exportCaseDecisionsReducer } from '../export-case-decisions.reducer';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CaseCountResult } from '../../contexts/mi-report';
import { InputValues } from '../../shared/from-to-dates/from-to-dates.component';
import { By } from '@angular/platform-browser';
import { LoadResultedCaseCount, LoadResultedCaseCountSuccess } from '../export-case-decisions.actions';

describe('ExportCaseDecisionsContainer', () => {
  let fixture: ComponentFixture<ExportCaseDecisionsContainer>;
  let store: Store<State>;
  let mockChildComponent: MockExportCaseDecisionsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportCaseDecisionsContainer, MockExportCaseDecisionsComponent],
      imports: [
        CommonModule,
        StoreModule.forRoot(reducers),
        StoreModule.forFeature('resultedCaseCount', exportCaseDecisionsReducer)
      ]
    });

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(ExportCaseDecisionsContainer);
    mockChildComponent = fixture.debugElement.query(By.directive(MockExportCaseDecisionsComponent)).componentInstance;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with resulted case count', () => {
    store.dispatch(new LoadResultedCaseCountSuccess({ casesResultedCount: 10 } as CaseCountResult));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch load case count action', () => {
    spyOn(store, 'dispatch');

    fixture.detectChanges();
    const param = {
      fromDate: '2018-01-01',
      toDate: '2018-01-01'
    };

    mockChildComponent.loadCaseCount.emit(param);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadResultedCaseCount(param));
  });

  @Component({
    selector: 'export-case-decisions',
    template: `
      {{ caseCountResult | json }}
    `
  })
  class MockExportCaseDecisionsComponent {
    @Input() caseCountResult: CaseCountResult;
    @Output() loadCaseCount: EventEmitter<InputValues> = new EventEmitter();
  }
});
