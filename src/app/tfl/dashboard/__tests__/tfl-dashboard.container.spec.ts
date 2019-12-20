import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';

import { CommonModule } from '@angular/common';
import { tflReducer } from '../../tfl.reducer';
import { reducers, State } from '../../../reducers';
import { LoadPleadedNotGuiltyCases } from '../../../core/actions';
import { PleadedNotGuiltyCaseResult, DefendantDetailsUpdatesResult } from '../../../contexts/sjp';
import { LoadCasesWithSjpNoticeCountSuccess, LoadFileUploadStatsSuccess } from '../../tfl.action';
import { MOCK_PENDING_DATES_TO_AVOID } from '../../../dashboard/__tests__/test-mock-data';
import { TflDashboardContainer } from '../tfl-dashboard.container';
import { FileUploadStatResult } from '../../../contexts/staging-tfl';

describe('TflDashboardContainer', () => {
  let fixture: ComponentFixture<TflDashboardContainer>;
  let navigate: jest.Mock;
  let store: Store<State>;

  const fileUploadStats = {
    csvUpload: {
      errorCount: 10
    },
    documentsUpload: {
      errorCount: 10
    }
  } as FileUploadStatResult;

  beforeEach(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      declarations: [TflDashboardContainer, MockTflDashboardComponent],
      imports: [CommonModule, StoreModule.forRoot({ ...reducers, tfl: tflReducer })]
    });

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(TflDashboardContainer);

    store.dispatch(new LoadPleadedNotGuiltyCases(MOCK_PENDING_DATES_TO_AVOID));
    store.dispatch(new LoadCasesWithSjpNoticeCountSuccess({ count: 0 }));
    store.dispatch(new LoadFileUploadStatsSuccess(fileUploadStats));
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'tfl-dashboard',
    template: `
      <span>{{ pleadedNotGuiltyCasesDetail | json }}</span>
      <span>{{ casesMissingSjpNoticeCount }}</span>
      <span>{{ documentsUploadErrorCount }}</span>
      <span>{{ csvUploadErrorCount }}</span>
      <span>{{ defendantDetailsUpdates }}</span>
    `
  })
  class MockTflDashboardComponent {
    @Input() pleadedNotGuiltyCasesDetail: PleadedNotGuiltyCaseResult;
    @Input() casesMissingSjpNoticeCount: number;
    @Input() documentsUploadErrorCount: number;
    @Input() csvUploadErrorCount: number;
    @Input() defendantDetailsUpdates: DefendantDetailsUpdatesResult;
  }
});
