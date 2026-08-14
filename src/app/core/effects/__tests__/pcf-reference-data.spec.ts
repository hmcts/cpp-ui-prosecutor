import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Action, provideStore } from '@ngrx/store';
import { PCFReferenceDataEffects } from '../pcf-reference-data.effects';
import { cold, hot } from 'jasmine-marbles';
import { reducers } from '../../reducers';
import {
  ApiError,
  LoadEthnicitiesAction,
  LoadEthnicitiesSuccessAction,
  LoadNationalitiesAction,
  LoadNationalitieSuccessAction,
  LoadObservedEthnicitiesAction,
  LoadObservedEthnicitiesSuccessAction
} from '../../actions';

import { Ethnicity, EthnicityCode, Nationality } from '../../model';
import { ReferenceDataService } from '../../../contexts/reference-data';
import { provideMockActions } from '@ngrx/effects/testing';

describe('Reference Data Effects', () => {
  let effects: PCFReferenceDataEffects;
  let actions$ = new Observable<Action>();

  let getEthnicities: jest.Mock;
  let getObservedEthnicities: jest.Mock;
  let getNationalities: jest.Mock;
  let getCustodyEstablishment: jest.Mock;
  let downloadCriminalMediaReport: jest.Mock;

  const ethnicities = [
    {
      code: '09',
      description: 'Afrikaan'
    }
  ] as Ethnicity[];

  const observedEthnicities: EthnicityCode[] = [
    {
      id: 'c4ca4238-a0b9-3382-8dcc-509a6f75849b',
      ethnicityCode: '2',
      ethnicityDescription: 'White - North European'
    }
  ];

  const nationalities = [
    {
      isoCode: 'GBR',
      countryName: 'United Kingdom'
    }
  ] as Nationality[];

  beforeEach(() => {
    getEthnicities = jest.fn();
    getObservedEthnicities = jest.fn();
    getNationalities = jest.fn();
    getCustodyEstablishment = jest.fn();
    downloadCriminalMediaReport = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        PCFReferenceDataEffects,
        provideMockActions(() => actions$),
        {
          provide: ReferenceDataService,
          useValue: {
            getEthnicities,
            getObservedEthnicities,
            getNationalities,
            getCustodyEstablishment,
            downloadCriminalMediaReport
          }
        },
        provideMockActions(() => actions$)
      ],
      teardown: { destroyAfterEach: false }
    });

    effects = TestBed.inject(PCFReferenceDataEffects);
    actions$ = TestBed.inject(Actions);
  });

  describe('loadEthnicities$', () => {
    const actionE = new LoadEthnicitiesAction();

    it('should get the ethnicities from service ', () => {
      const loadEthnicitySuccess = new LoadEthnicitiesSuccessAction(ethnicities);

      actions$ = hot('-a----', { a: actionE });
      const ethnicities$ = cold('-(b|)', { b: ethnicities });
      const expected$ = cold('--c---', { c: loadEthnicitySuccess });

      getEthnicities.mockReturnValue(ethnicities$);
      expect(effects.loadEthnicities$).toBeObservable(expected$);
    });

    it('should raise an api error when load enthnicity fails', () => {
      const error = { status: 400 };
      const apiError = new ApiError(error);

      actions$ = hot('-a---', { a: actionE });
      const failed$ = cold('-#', {}, error);
      const expected$ = cold('--e-', { e: apiError });

      getEthnicities.mockReturnValue(failed$);
      expect(effects.loadEthnicities$).toBeObservable(expected$);
    });
  });

  describe('loadObservedEthnicities$', () => {
    const actionE = new LoadObservedEthnicitiesAction();

    it('should get the ObservedEthnicities from service ', () => {
      const loadObservedEthnicitySuccess = new LoadObservedEthnicitiesSuccessAction(observedEthnicities);

      actions$ = hot('-a----', { a: actionE });
      const observedEthnicities$ = cold('-(b|)', { b: observedEthnicities });
      const expected$ = cold('--c---', { c: loadObservedEthnicitySuccess });

      getObservedEthnicities.mockReturnValue(observedEthnicities$);
      expect(effects.loadObservedEthnicities$).toBeObservable(expected$);
    });

    it('should raise an api error when load enthnicity fails', () => {
      const error = { status: 400 };
      const apiError = new ApiError(error);

      actions$ = hot('-a---', { a: actionE });
      const failed$ = cold('-#', {}, error);
      const expected$ = cold('--e-', { e: apiError });

      getObservedEthnicities.mockReturnValue(failed$);
      expect(effects.loadObservedEthnicities$).toBeObservable(expected$);
    });
  });

  describe('loadNationalities$', () => {
    const actionN = new LoadNationalitiesAction();

    it('should get the nationalities from service ', () => {
      const loadNationalitySuccess = new LoadNationalitieSuccessAction(nationalities);

      actions$ = hot('-a----', { a: actionN });
      const nationalities$ = cold('-(b|)', { b: nationalities });
      const expected$ = cold('--c---', { c: loadNationalitySuccess });

      getNationalities.mockReturnValue(nationalities$);
      expect(effects.loadNationalities$).toBeObservable(expected$);
    });

    it('should raise an api error when load nationality fails', () => {
      const error = { status: 400 };
      const apiError = new ApiError(error);

      actions$ = hot('-a---', { a: actionN });
      const failed$ = cold('-#', {}, error);
      const expected$ = cold('--e-', { e: apiError });

      getNationalities.mockReturnValue(failed$);
      expect(effects.loadNationalities$).toBeObservable(expected$);
    });
  });
});
