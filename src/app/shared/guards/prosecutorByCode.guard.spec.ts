import { TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { Router } from '@angular/router';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Prosecutor } from '@cpp/reference-data';
import { cold } from 'jasmine-marbles';
import { reducers } from '../../reducers';
import { ReferenceDataService } from '../../contexts/reference-data';
import { State, LoadProsecutorByUserGroupSuccess } from '../../core';
import { ProsecutorByCodeGuard } from './prosecutorByCode.guard';

describe('ProsecutorByCodeGuard', () => {
  let getProsecutorByCode: jest.Mock;
  const navigate: jest.Mock = jest.fn();
  let store: MockStore<State>;
  let guard: ProsecutorByCodeGuard;
  let apiSuccessCaseDetails$: TestColdObservable;

  beforeEach(() => {
    getProsecutorByCode = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        ProsecutorByCodeGuard,
        MockStore,
        provideMockStore({
          initialState: {}
        }),
        {
          provide: ReferenceDataService,
          useValue: {
            getProsecutorByCode
          }
        },
        {
          provide: Router,
          useValue: {
            navigate
          }
        }
      ]
    });
    store = TestBed.inject(MockStore);
    guard = TestBed.inject(ProsecutorByCodeGuard);
  });

  describe('Exists in store', () => {
    beforeEach(() => {
      store.setState({
        pcfReferenceData: {
          prosecutorByUserGroup: { cpsFlag: true }
        },
        usersGroups: {
          userGroups: []
        }
      } as State);

      store.dispatch(new LoadProsecutorByUserGroupSuccess({ cpsFlag: true } as Prosecutor));
    });

    it('should not call if already exists in store', () => {
      const expected$ = cold('(b|)-', { b: true });

      expect(guard.canActivate()).toBeObservable(expected$);
      expect(getProsecutorByCode).not.toHaveBeenCalled();
    });
  });

  describe('Should call api', () => {
    beforeEach(() => {
      store.setState({
        pcfReferenceData: {
          prosecutorByUserGroup: {}
        },
        usersGroups: {
          userGroups: [
            {
              prosecutingAuthority: 'DVLA'
            }
          ]
        }
      } as State);

      store.dispatch(new LoadProsecutorByUserGroupSuccess({ cpsFlag: true } as Prosecutor));
      apiSuccessCaseDetails$ = cold('-(a|)', { a: [] });
    });

    it('should call and set data in store', () => {
      const expected$ = cold('-(b|)-', { b: true });

      getProsecutorByCode.mockReturnValue(apiSuccessCaseDetails$);

      expect(guard.canActivate()).toBeObservable(expected$);
      expect(getProsecutorByCode).toHaveBeenCalled();
    });
  });

  describe('Should call api with prosecuting authority all', () => {
    beforeEach(() => {
      store.setState({
        pcfReferenceData: {
          prosecutorByUserGroup: {}
        },
        usersGroups: {
          userGroups: [
            {
              prosecutingAuthority: 'ALL'
            }
          ]
        }
      } as State);

      store.dispatch(new LoadProsecutorByUserGroupSuccess({ cpsFlag: true } as Prosecutor));
      apiSuccessCaseDetails$ = cold('-(a|)', { a: [] });
    });

    it('should call and set data in store', () => {
      const expected$ = cold('-(b|)-', { b: true });

      getProsecutorByCode.mockReturnValue(apiSuccessCaseDetails$);

      expect(guard.canActivate()).toBeObservable(expected$);
      expect(getProsecutorByCode).toHaveBeenCalled();
    });
  });

  describe(' API fails', () => {
    let apiErrors$: TestColdObservable;
    beforeEach(() => {
      store.setState({
        pcfReferenceData: {
          prosecutorByUserGroup: {}
        },
        usersGroups: {
          userGroups: [
            {
              prosecutingAuthority: 'ALL'
            }
          ]
        }
      } as State);

      store.dispatch(new LoadProsecutorByUserGroupSuccess({ cpsFlag: true } as Prosecutor));
      apiErrors$ = cold('-(#)');
    });

    it('when api Fails', () => {
      const activate$ = guard.canActivate();
      getProsecutorByCode.mockReturnValue(apiErrors$);
      const expected$ = cold('-(a|)', { a: false });

      expect(activate$).toBeObservable(expected$);
      expect(getProsecutorByCode).toHaveBeenCalled();
    });
  });
});
