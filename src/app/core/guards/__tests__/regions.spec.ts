import { Store, StoreModule } from '@ngrx/store';
import { reducers, State } from '../../reducers';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { SjpService, Region } from '../../../contexts/sjp';
import { LoadRegionsSuccess } from '../../actions';
import { RegionsGuard } from '../regions.guard';
import { Router } from '@angular/router';

describe('RegionsGuard', () => {
  let guard: RegionsGuard;
  let store: Store<State>;
  let getRegions: jest.Mock;
  let navigate: jest.Mock;

  beforeEach(() => {
    getRegions = jest.fn();
    navigate = jest.fn();
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers, {runtimeChecks: {}})],
      providers: [
        RegionsGuard,
        {
          provide: SjpService,
          useValue: {
            getRegions
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

    guard = TestBed.get(RegionsGuard);
    store = TestBed.get(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should fetch the data remotely and dispatch an action', () => {
    const regions = [
      {
        label: 'West',
        value: 'WEST'
      },
      {
        label: 'North',
        value: 'NORTH'
      }
    ] as Region[];

    const kase$ = cold('-a|', { a: regions });
    const expected$ = cold('-(b|)', { b: true });

    getRegions.mockReturnValue(kase$);
    const activate$ = guard.canActivate();

    expect(activate$).toBeObservable(expected$);
    regions.unshift({
      label: 'All',
      value: 'ALL'
    },
    {
      label: 'Blank',
      value: 'BLANK'
    });
    expect(store.dispatch).toHaveBeenCalledWith(new LoadRegionsSuccess(regions));
  });
});
