import { ExportCaseDecisionsContainer } from '../export-case-decisions.container';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { reducers, State } from '../../reducers';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CaseCountResult } from '../../contexts/mi-report';
import { InputValues } from '../../shared/from-to-dates/from-to-dates.component';
import { By } from '@angular/platform-browser';
import { LoadResultedCaseCount, LoadResultedCaseCountSuccess } from '../export-case-decisions.actions';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { ExportCaseDecisionsComponent } from '../components/export-case-decisions.component';

describe('ExportCaseDecisionsContainer', () => {
  let fixture: ComponentFixture<ExportCaseDecisionsContainer>;
  let store: Store<State>;
  let mockChildComponent: MockExportCaseDecisionsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ role: 'user' })
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    }).overrideComponent(ExportCaseDecisionsContainer, {
      remove: {
        imports: [ExportCaseDecisionsComponent]
      },
      add: {
        imports: [MockExportCaseDecisionsComponent]
      }
    });

    store = TestBed.inject(Store); // Changed from TestBed.get
    fixture = TestBed.createComponent(ExportCaseDecisionsContainer);
    fixture.detectChanges(); // Add this before querying
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
    jest.spyOn(store, 'dispatch'); // Changed from spyOn

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
      {{ role | json }}
    `,
    imports: [JsonPipe]
  })
  class MockExportCaseDecisionsComponent {
    @Input() role: string;
    @Input() caseCountResult: CaseCountResult;
    @Output() loadCaseCount: EventEmitter<InputValues> = new EventEmitter();
  }
});
