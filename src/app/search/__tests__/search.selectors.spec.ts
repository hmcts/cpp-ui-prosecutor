import { combineReducers } from '@ngrx/store';
import { reducers } from '../../core';
import * as fromActions from '../search.action';
import * as fromSelectors from '../search.selectors';
import { searchReducer as search, SearchState } from '../search.reducer';
import { MOCK_SEARCH_RESULTS } from './test-mock-data';

describe('search/selectors', () => {
  const reducer = combineReducers({ ...reducers, search });

  const createState = (actions: fromActions.SearchActions[]) => {
    return [...actions].reduce((state, action) => reducer(state, action), {
      search: null
    } as fromSelectors.FeatureState);
  };

  describe('getSearchKeyword', () => {
    it('should select the available keyword', () => {
      const state = createState([new fromActions.SearchSuccess({ keyword: 'keyword' } as SearchState)]);
      expect(fromSelectors.getKeyword(state)).toMatchSnapshot();
    });
  });

  describe('getSearchResultCases', () => {
    it('should select the available cases with details', () => {
      const state = createState([new fromActions.SearchSuccess({ ...MOCK_SEARCH_RESULTS, keyword: 'keyword' })]);
      expect(fromSelectors.getSearchResultCases(state)).toMatchSnapshot();
    });
  });

  describe('getProsecutorAuthorities', () => {
    it('should return prosecutor authorities from user groups', () => {
      const userGroups = [{ prosecutingAuthority: 'TFL' }, { prosecutingAuthority: 'TVL' }] as any;
      const result = fromSelectors.getProsecutorAuthorities.projector(userGroups);
      expect(result).toEqual(['TFL', 'TVL']);
    });

    it('should filter out groups without prosecutingAuthority', () => {
      const userGroups = [
        { prosecutingAuthority: 'TFL' },
        { prosecutingAuthority: null },
        { prosecutingAuthority: 'TVL' },
        { prosecutingAuthority: undefined },
        { prosecutingAuthority: '' }
      ] as any;
      const result = fromSelectors.getProsecutorAuthorities.projector(userGroups);
      expect(result).toEqual(['TFL', 'TVL']);
    });

    it('should return empty array when user groups is null', () => {
      const result = fromSelectors.getProsecutorAuthorities.projector(null);
      expect(result).toEqual([]);
    });

    it('should return empty array when user groups is undefined', () => {
      const result = fromSelectors.getProsecutorAuthorities.projector(undefined);
      expect(result).toEqual([]);
    });

    it('should return empty array when user groups is empty', () => {
      const result = fromSelectors.getProsecutorAuthorities.projector([]);
      expect(result).toEqual([]);
    });

    it('should return empty array when no groups have prosecutingAuthority', () => {
      const userGroups = [
        { prosecutingAuthority: null },
        { prosecutingAuthority: undefined },
        { prosecutingAuthority: '' }
      ] as any;
      const result = fromSelectors.getProsecutorAuthorities.projector(userGroups);
      expect(result).toEqual([]);
    });

    it('should return single prosecutor authority when only one group has it', () => {
      const userGroups = [{ prosecutingAuthority: 'DVLA' }] as any;
      const result = fromSelectors.getProsecutorAuthorities.projector(userGroups);
      expect(result).toEqual(['DVLA']);
    });

    it('should preserve order of prosecutor authorities from user groups', () => {
      const userGroups = [
        { prosecutingAuthority: 'TVL' },
        { prosecutingAuthority: 'TFL' },
        { prosecutingAuthority: 'DVLA' }
      ] as any;
      const result = fromSelectors.getProsecutorAuthorities.projector(userGroups);
      expect(result).toEqual(['TVL', 'TFL', 'DVLA']);
    });
  });
});
