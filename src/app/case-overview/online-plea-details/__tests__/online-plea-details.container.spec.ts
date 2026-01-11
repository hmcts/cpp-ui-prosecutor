import { OnlinePleaDetailsContainer } from '../online-plea-details.container';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureState } from '../../case-overview.selectors';
import { Component, Input } from '@angular/core';
import { MOCK_CASE, MOCK_ONLINE_PLEA_DETAIL } from '../../__tests__/test-mock-data';
import { Case, FrequencyOptions, OnlinePlea } from '../../../contexts/sjp';
import { LoadCaseSuccess, LoadProsecutorByUserGroupSuccess } from '../../../core';
import { LoadOnlinePleaSuccess } from '../../case-overview.action';
import { OnlinePleaUi } from '../online-plea-interface';
import { transformOnlinePleaToUiModel } from '../online-plea-utils';
import { UserGroup } from '@cpp/users-groups';
import { Prosecutor } from '@cpp/reference-data';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { JsonPipe } from '@angular/common';
import { OnlinePleaDetailsComponent } from '../components/online-plea-details.component';

describe('OnlinePleaDetailsContainer', () => {
  let fixture: ComponentFixture<OnlinePleaDetailsContainer>;
  let store: Store<FeatureState>;
  const mockOnlinePleas = transformOnlinePleaToUiModel(MOCK_ONLINE_PLEA_DETAIL.pleas);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            caseOverview: {
              onlinePlea: MOCK_ONLINE_PLEA_DETAIL
            }
          }
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: '123'
              }
            }
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    })
      .overrideComponent(OnlinePleaDetailsContainer, {
        remove: {
          imports: [OnlinePleaDetailsComponent]
        },
        add: {
          imports: [MockOnlinePleaDetailsComponent]
        }
      })
      .compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(OnlinePleaDetailsContainer);
    store.dispatch(new LoadCaseSuccess(MOCK_CASE));
    store.dispatch(new LoadOnlinePleaSuccess(MOCK_ONLINE_PLEA_DETAIL));
    store.dispatch(new LoadProsecutorByUserGroupSuccess({ cpsFlag: true } as Prosecutor));
    fixture.detectChanges();
  });

  @Component({
    selector: 'online-plea-details',
    template: `
      <div>{{ kase | json }}</div>
      <div>{{ onlinePleas | json }}</div>
      <div>{{ userGroups | json }}</div>
    `,
    imports: [JsonPipe, MockOnlinePleaDetailsComponent]
  })
  class MockOnlinePleaDetailsComponent {
    @Input() kase: Case;
    @Input() onlinePleas: OnlinePleaUi[] = [];
    @Input() userGroups: UserGroup[] = [];
  }

  it('should compile correctly', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should compute additional fields for the UI model', () => {
    const uiModel: OnlinePleaUi[] = transformOnlinePleaToUiModel(mockOnlinePleas);
    expect(uiModel[0].employment.incomeAfterTaxType).toBe(
      FrequencyOptions.find(freq => freq.value === MOCK_ONLINE_PLEA_DETAIL.pleas[0].employment.incomePaymentFrequency)
        .label
    );
    expect(uiModel[0].outgoings.showDetailsOfMonthlyBillings).toBe(
      !!MOCK_ONLINE_PLEA_DETAIL.pleas[0].outgoings.monthlyAmount
    );
  });

  it('should suppress court hearing section when all guilty pleas', () => {
    const mockCase = [
      {
        ...MOCK_ONLINE_PLEA_DETAIL.pleas[0],
        onlinePleaDetails: [
          {
            id: 'onlinePleaId1',
            offenceId: 'offenceId1',
            caseId: 'caseId',
            defendantId: 'defendantId',
            plea: 'GUILTY',
            notGuiltyBecause: 'Not guilty plea1',
            offenceTitle: 'Obstruct person executing search warrant for TV receiver'
          },
          {
            id: 'onlinePleaId2',
            offenceId: 'offenceId2',
            caseId: 'caseId',
            defendantId: 'defendantId',
            plea: 'GUILTY',
            mitigation: 'Guilty plea mitigation2',
            offenceTitle: 'Use / install a television set without a licence'
          }
        ]
      }
    ] as OnlinePlea[];
    const uiModel: OnlinePleaUi[] = transformOnlinePleaToUiModel(mockCase);
    expect(uiModel[0].pleaDetails.hasHearing).toBe(false);
  });

  it('should show court hearing section for NOT_GUILTY pleas', () => {
    const mockCase = [
      {
        ...MOCK_ONLINE_PLEA_DETAIL.pleas[0],
        onlinePleaDetails: [
          {
            id: 'onlinePleaId1',
            offenceId: 'offenceId1',
            caseId: 'caseId',
            defendantId: 'defendantId',
            plea: 'NOT_GUILTY',
            notGuiltyBecause: 'Not guilty plea1',
            offenceTitle: 'Obstruct person executing search warrant for TV receiver'
          },
          {
            id: 'onlinePleaId2',
            offenceId: 'offenceId2',
            caseId: 'caseId',
            defendantId: 'defendantId',
            plea: 'NOT_GUILTY',
            mitigation: 'Guilty plea mitigation2',
            offenceTitle: 'Use / install a television set without a licence'
          }
        ]
      }
    ] as OnlinePlea[];
    const uiModel: OnlinePleaUi[] = transformOnlinePleaToUiModel(mockCase);
    expect(uiModel[0].pleaDetails.hasHearing).toBe(true);
  });

  it('should show court hearing section for GUILTY_REQUEST_HEARING pleas', () => {
    const mockCase = [
      {
        ...MOCK_ONLINE_PLEA_DETAIL.pleas[0],
        onlinePleaDetails: [
          {
            id: 'onlinePleaId1',
            offenceId: 'offenceId1',
            caseId: 'caseId',
            defendantId: 'defendantId',
            plea: 'GUILTY_REQUEST_HEARING',
            notGuiltyBecause: 'Not guilty plea1',
            offenceTitle: 'Obstruct person executing search warrant for TV receiver'
          },
          {
            id: 'onlinePleaId2',
            offenceId: 'offenceId2',
            caseId: 'caseId',
            defendantId: 'defendantId',
            plea: 'GUILTY_REQUEST_HEARING',
            mitigation: 'Guilty plea mitigation2',
            offenceTitle: 'Use / install a television set without a licence'
          }
        ]
      }
    ] as OnlinePlea[];
    const uiModel: OnlinePleaUi[] = transformOnlinePleaToUiModel(mockCase);
    expect(uiModel[0].pleaDetails.hasHearing).toBe(true);
  });

  it('should show come to court if all pleas are GUILTY pleas', () => {
    const mockCase = [
      {
        ...MOCK_ONLINE_PLEA_DETAIL.pleas[0],
        onlinePleaDetails: [
          {
            id: 'onlinePleaId1',
            offenceId: 'offenceId1',
            caseId: 'caseId',
            defendantId: 'defendantId',
            plea: 'GUILTY',
            mitigation: 'Guilty plea mitigation1',
            offenceTitle: 'Obstruct person executing search warrant for TV receiver'
          },
          {
            id: 'onlinePleaId2',
            offenceId: 'offenceId2',
            caseId: 'caseId',
            defendantId: 'defendantId',
            plea: 'GUILTY',
            mitigation: 'Guilty plea mitigation2',
            offenceTitle: 'Use / install a television set without a licence'
          }
        ],
        pleaDetails: {
          comeToCourt: false
        }
      }
    ] as OnlinePlea[];
    const uiModel: OnlinePleaUi[] = transformOnlinePleaToUiModel(mockCase);
    expect(uiModel[0].pleaDetails.comeToCourt).toBe(false);
  });

  it('should show come to court if all pleas are GUILTY_REQUEST_HEARING pleas', () => {
    const mockCase = [
      {
        ...MOCK_ONLINE_PLEA_DETAIL.pleas[0],
        onlinePleaDetails: [
          {
            id: 'onlinePleaId1',
            offenceId: 'offenceId1',
            caseId: 'caseId',
            defendantId: 'defendantId',
            plea: 'GUILTY_REQUEST_HEARING',
            mitigation: 'Guilty plea mitigation1',
            offenceTitle: 'Obstruct person executing search warrant for TV receiver'
          },
          {
            id: 'onlinePleaId2',
            offenceId: 'offenceId2',
            caseId: 'caseId',
            defendantId: 'defendantId',
            plea: 'GUILTY_REQUEST_HEARING',
            mitigation: 'Guilty plea mitigation2',
            offenceTitle: 'Use / install a television set without a licence'
          }
        ],
        pleaDetails: {
          comeToCourt: true
        }
      }
    ] as OnlinePlea[];
    const uiModel: OnlinePleaUi[] = transformOnlinePleaToUiModel(mockCase);
    expect(uiModel[0].pleaDetails.comeToCourt).toBe(true);
  });

  it('should not show come to court if there is at least one NOT_GUILTY_REQUEST plea', () => {
    const mockCase = [
      {
        ...MOCK_ONLINE_PLEA_DETAIL.pleas[0],
        onlinePleaDetails: [
          {
            id: 'onlinePleaId1',
            offenceId: 'offenceId1',
            caseId: 'caseId',
            defendantId: 'defendantId',
            plea: 'NOT_GUILTY',
            notGuiltyBecause: 'I am innocent',
            offenceTitle: 'Obstruct person executing search warrant for TV receiver'
          },
          {
            id: 'onlinePleaId2',
            offenceId: 'offenceId2',
            caseId: 'caseId',
            defendantId: 'defendantId',
            plea: 'GUILTY',
            mitigation: 'Guilty plea mitigation2',
            offenceTitle: 'Use / install a television set without a licence'
          }
        ],
        pleaDetails: {
          comeToCourt: true
        }
      }
    ] as OnlinePlea[];
    const uiModel: OnlinePleaUi[] = transformOnlinePleaToUiModel(mockCase);
    expect(uiModel[0].pleaDetails.comeToCourt).toBeUndefined();
  });
});
