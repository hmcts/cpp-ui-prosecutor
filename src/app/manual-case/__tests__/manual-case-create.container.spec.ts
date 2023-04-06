import { ActivatedRoute, Router } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockPipesModule } from '../../shared/pipes/mock-pipes';
import { State, reducers } from '../../core';
import {
  LoadSummonsCodesSuccessAction,
  LoadManualCaseDetailsSuccess,
  StoreManualCase,
  StoreManualCaseDefendant,
  StoreManualCaseDefendantList,
} from '../../core/actions';
import { ManualCaseAndDocuments, ManualCaseDefendant } from '../../core/model';
import { ManualCaseCreateContainer, SubmitData } from '../manual-case-create.container';
import { ManualCaseNavigationService } from '../manual-case-nav.service';
import { ManualCasePath } from '../manual-case.interface';
import { ManualCase } from '../../core/model/manual-case';
import { StoreManualCaseDefendantsEitherWayOffences } from '../../core/actions/manual-case-details.actions';
import { ManualCaseOffenceStateService } from '../offences-state.service';

let navigate: jest.Mock;

const summonsCodes = [
  {
    id: '4aaecac5-222b-402d-9047-84803679edac',
    seqNo: 10,
    summonsCode: 'A',
    summonsCodeDescription: 'Application / Complaint',
    validFrom: '2019-03-01',
  },
  {
    id: '5aaecac5-222b-402d-9047-84803679edac',
    seqNo: 20,
    summonsCode: 'B',
    summonsCodeDescription: 'Breach offences',
    validFrom: '2019-03-01',
  },
];

const initModule = (
  appPath: string,
  getNavgationPath,
  getManualCasePageView,
  updatePrevRouteParams
) => {
  window.scrollTo = jest.fn();

  TestBed.configureCompiler({ preserveWhitespaces: false } as any).configureTestingModule({
    declarations: [
      ManualCaseCreateContainer,
      TestManualCaseTypeComponent,
      TestManualCaseProsecutorComponent,
      TestManualCaseDefendantComponent,
    ],
    imports: [
      MockPipesModule,
      RouterTestingModule,
      StoreModule.forRoot(reducers, { runtimeChecks: {} }),
    ],
    providers: [
      ManualCaseOffenceStateService,
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            params: { caseId: 'manual-case-id-001' },
            queryParams: {},
          },
          routeConfig: { path: appPath },
        },
      },
      {
        provide: Router,
        useValue: { navigate },
      },
      {
        provide: ManualCaseNavigationService,
        useValue: {
          getNavgationPath,
          getManualCasePageView,
          updatePrevRouteParams,
        },
      },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });
};

describe('Manual Case Create Container', () => {
  let fixture: ComponentFixture<ManualCaseCreateContainer>;
  let store: Store<State>;
  let getNavgationPath: jest.Mock;
  let getManualCasePageView: jest.Mock;
  let updatePrevRouteParams: jest.Mock;

  const caseDetails = {
    caseId: 'manual-case-id-001',
    initiationCode: 'S',
    summonsCode: 'E',
  } as ManualCase;

  describe('Add case type to store', () => {
    beforeEach(() => {
      getNavgationPath = jest.fn();
      getManualCasePageView = jest.fn();
      updatePrevRouteParams = jest.fn();
      navigate = jest.fn();

      initModule(
        ManualCasePath.NewCaseType,
        getNavgationPath,
        getManualCasePageView,
        updatePrevRouteParams
      );

      store = TestBed.get(Store);

      store.dispatch(new LoadManualCaseDetailsSuccess({ caseDetails } as ManualCaseAndDocuments));
      store.dispatch(new LoadSummonsCodesSuccessAction(summonsCodes));
      fixture = TestBed.createComponent(ManualCaseCreateContainer);
      jest.spyOn(store, 'dispatch');
    });

    it('should render the case type component', () => {
      expect(fixture).toMatchSnapshot();
    });

    it('should submit selected case type and summons to store', () => {
      getManualCasePageView.mockReturnValue({});
      getNavgationPath.mockReturnValue(['manual-case', 'page-two']);

      fixture.detectChanges();

      caseDetails.summonsCode = 'B';

      fixture.componentInstance.storeManualCaseData(caseDetails);

      expect(store.dispatch).toHaveBeenCalledWith(new StoreManualCase(caseDetails));
      expect(getManualCasePageView).toHaveBeenCalledWith(ManualCasePath.NewCaseType);
      expect(getNavgationPath).toHaveBeenCalledWith(ManualCasePath.NewCaseType, 'S');
      expect(navigate).toHaveBeenCalledWith(['manual-case', 'page-two']);
    });
  });

  describe('Save Manual Case to DB', () => {
    beforeEach(() => {
      getNavgationPath = jest.fn();
      getManualCasePageView = jest.fn();
      updatePrevRouteParams = jest.fn();
      navigate = jest.fn();
      initModule(
        ManualCasePath.CaseSummary,
        getNavgationPath,
        getManualCasePageView,
        updatePrevRouteParams
      );

      store = TestBed.get(Store);
      fixture = TestBed.createComponent(ManualCaseCreateContainer);
      jest.spyOn(store, 'dispatch');
    });

    it('should render the Add application component', () => {
      expect(fixture).toMatchSnapshot();
    });

    it('should submit and save application data', () => {
      getManualCasePageView.mockReturnValue({});
      getNavgationPath.mockReturnValue(['root', 'child']);

      fixture.detectChanges();

      fixture.componentInstance.storeManualCaseData({
        caseId: 'case_001',
        initiationCode: 'Application',
      });
      expect(navigate).toHaveBeenCalledWith(['application', 'select-type']);

      const manualCase = {
        caseId: 'case_001',
        initiationCode: 'J',
      } as ManualCase;

      fixture.componentInstance.storeManualCaseData(manualCase);

      expect(store.dispatch).toHaveBeenCalledWith(new StoreManualCase(manualCase));
      expect(getNavgationPath).toHaveBeenCalledWith(
        ManualCasePath.CaseSummary,
        manualCase.initiationCode
      );
      expect(navigate).toHaveBeenCalledWith(['root', 'child']);

      const manualCaseWithDefendant = {
        navigateToNextPage: true,
        defendantToStore: {
          id: '98d45802-117c-44e9-9574-cbbcca998d85',
          individual: {
            personalInformation: {
              title: 'Mr',
              firstName: 'Ben',
              lastName: 'Joyce',
            },
          },
        },
      };

      fixture.componentInstance.storeManualCaseDefendant(manualCaseWithDefendant);

      expect(store.dispatch).toHaveBeenCalledWith(
        new StoreManualCaseDefendant(
          manualCaseWithDefendant.defendantToStore as ManualCaseDefendant
        )
      );
      expect(navigate).toHaveBeenCalledWith(['root', 'child']);

      const caseData = [
        {
          id: '14c36d5e-064c-4eba-8a41-2415e6809d3a',
          individual: {
            personalInformation: {
              firstName: 'Ben',
              lastName: 'Joyce',
            },
          },
          offences: [{ offenceCode: 'MD71513' }],
        },
        {
          id: '6fa8d077-91d6-4806-91f9-d543a4943cf5',
          individual: {
            personalInformation: {
              firstName: 'John',
              lastName: 'Chivers',
            },
          },
          offences: [{ offenceCode: 'MD71513' }],
        },
      ] as ManualCaseDefendant[];

      const manualCaseWithDefendantAndOffences = {
        navigateToNextPage: true,
        defendantsWithOffences: caseData,
        isEitherWayOffence: true,
      };

      const submitData = {
        navigateToNextPage: true,
        caseData,
      };

      fixture.componentInstance.storeManualCaseDefendantList(manualCaseWithDefendantAndOffences);

      expect(store.dispatch).toHaveBeenCalledWith(
        new StoreManualCaseDefendantList(manualCaseWithDefendantAndOffences.defendantsWithOffences)
      );
      expect(navigate).toHaveBeenCalledWith(['root', 'child']);

      fixture.componentInstance.storeEitherWayOffenceData(submitData);

      expect(store.dispatch).toHaveBeenCalledWith(
        new StoreManualCaseDefendantsEitherWayOffences(submitData.caseData)
      );
      expect(navigate).toHaveBeenCalledWith(['root', 'child']);
    });
  });
});

@Component({
  selector: 'manual-case-type',
  template: `
    <div>{{ manualCaseDetail | json }}</div>
    <div>{{ summonsCodes | json }}</div>
  `,
})
class TestManualCaseTypeComponent {
  @Input() manualCaseDetail: ManualCase;
  @Input() summonsCodes: any[];
  @Output() submitFormData = new EventEmitter<ManualCase>();
}

@Component({
  selector: 'manual-case-prosecutor',
  template: ` <div></div> `,
})
class TestManualCaseProsecutorComponent {
  @Output() submitFormData = new EventEmitter<ManualCase>();
}

@Component({
  selector: 'manual-case-defendant',
  template: ` <div></div> `,
})
class TestManualCaseDefendantComponent {
  @Output() submitFormData = new EventEmitter<ManualCase>();
}
