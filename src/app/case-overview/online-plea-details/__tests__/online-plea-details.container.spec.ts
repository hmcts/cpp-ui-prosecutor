import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Input, Component } from '@angular/core';
import { OnlinePleaDetailsContainer } from '../online-plea-details.container';
import { OnlinePleaUi } from '../online-plea-interface';
import { reducers } from '../../../reducers';
import { FeatureState } from '../../case-overview.selectors';
import { Case, OnlinePlea } from '../../../contexts/sjp';
import { MOCK_ONLINE_PLEA_DETAIL } from '../../__tests__/test-mock-data';
import { LoadOnlinePleaSuccess } from '../../case-overview.action';

describe('OnlinePleaDetailsContainer', () => {
  let fixture: ComponentFixture<OnlinePleaDetailsContainer>;
  let store: Store<FeatureState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlinePleaDetailsContainer, MockOnlinePleaDetailsComponent],
      imports: [StoreModule.forRoot(reducers)]
    });

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(OnlinePleaDetailsContainer);
  });

  @Component({
    selector: 'online-plea-details',
    template: `
      <div>{{ onlinePlea | json }}</div>
    `
  })
  class MockOnlinePleaDetailsComponent {
    @Input() onlinePlea: OnlinePleaUi;
    @Input() kase: Case;
  }

  it('should compile correctly', () => {
    store.dispatch(new LoadOnlinePleaSuccess(MOCK_ONLINE_PLEA_DETAIL));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compute additional fields for the UI model', () => {
    store.dispatch(new LoadOnlinePleaSuccess(MOCK_ONLINE_PLEA_DETAIL));
    fixture.detectChanges();

    const uiModel: OnlinePleaUi = fixture.componentInstance.transformToUiModel(MOCK_ONLINE_PLEA_DETAIL);
    expect(uiModel.pleaDetails.existsUnavailability).toBeDefined();
    expect(uiModel.pleaDetails.existsUnavailability).toBe(!!MOCK_ONLINE_PLEA_DETAIL.pleaDetails.unavailability);
    expect(uiModel.pleaDetails.doHaveOwnWitness).toBeDefined();
    expect(uiModel.pleaDetails.doHaveOwnWitness).toBe(!!MOCK_ONLINE_PLEA_DETAIL.pleaDetails.witnessDetails);
  });

  it('should suppress court hearing section when all guilty pleas', () => {
    const mockCase = {
      ...MOCK_ONLINE_PLEA_DETAIL,
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
      ],
    } as OnlinePlea;
    const uiModel: OnlinePleaUi = fixture.componentInstance.transformToUiModel(mockCase);
    expect(uiModel.pleaDetails.hasHearing).toBe(false);
  });

  it('should show court hearing section for NOT_GUILTY pleas', () => {
    const mockCase = {
      ...MOCK_ONLINE_PLEA_DETAIL,
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
      ],
    } as OnlinePlea;
    const uiModel: OnlinePleaUi = fixture.componentInstance.transformToUiModel(mockCase);
    expect(uiModel.pleaDetails.hasHearing).toBe(true);
  });

  it('should show court hearing section for GUILTY_REQUEST_HEARING pleas', () => {
    const mockCase = {
      ...MOCK_ONLINE_PLEA_DETAIL,
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
      ],
    } as OnlinePlea;
    const uiModel: OnlinePleaUi = fixture.componentInstance.transformToUiModel(mockCase);
    expect(uiModel.pleaDetails.hasHearing).toBe(true);
  });

  it('should show come to court if all pleas are GUILTY pleas', () => {
    const mockCase = {
      ...MOCK_ONLINE_PLEA_DETAIL,
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
    } as OnlinePlea;
    const uiModel: OnlinePleaUi = fixture.componentInstance.transformToUiModel(mockCase);
    expect(uiModel.pleaDetails.comeToCourt).toBe(false);
  });

  it('should show come to court if all pleas are GUILTY_REQUEST_HEARING pleas', () => {
    const mockCase = {
      ...MOCK_ONLINE_PLEA_DETAIL,
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
    } as OnlinePlea;
    const uiModel: OnlinePleaUi = fixture.componentInstance.transformToUiModel(mockCase);
    expect(uiModel.pleaDetails.comeToCourt).toBe(true);
  });

  it('should not show come to court if there is at least one NOT_GUILTY_REQUEST plea', () => {
    const mockCase = {
      ...MOCK_ONLINE_PLEA_DETAIL,
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
    } as OnlinePlea;
    const uiModel: OnlinePleaUi = fixture.componentInstance.transformToUiModel(mockCase);
    expect(uiModel.pleaDetails.comeToCourt).toBeUndefined();
  });

});
