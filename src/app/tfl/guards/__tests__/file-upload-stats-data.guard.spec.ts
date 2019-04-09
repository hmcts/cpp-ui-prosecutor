import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { State } from '../../../reducers';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { LoadFileUploadStatsSuccess } from '../../tfl.action';
import { tflReducer } from '../../tfl.reducer';
import { FileUploadStatsDataGuard } from '../file-upload-stats-data.guard';
import { FileUploadStat, CsvFileUploadStatResult, StagingTflService } from '../../../contexts/staging-tfl';

describe('FileUploadStatsDataGuard', () => {
  let guard: FileUploadStatsDataGuard;
  let store: Store<State>;
  let getFileUploadStats: jest.Mock;
  let navigate: jest.Mock;

  beforeEach(() => {
    getFileUploadStats = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      declarations: [],
      imports: [StoreModule.forRoot(tflReducer)],
      providers: [
        FileUploadStatsDataGuard,
        {
          provide: StagingTflService,
          useValue: {
            getFileUploadStats
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

    guard = TestBed.get(FileUploadStatsDataGuard);
    store = TestBed.get(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should call the service and load data', () => {
    const fileUploadStatResult = { csvUpload: { errorCount: 10 } as FileUploadStat } as CsvFileUploadStatResult;
    const fileUploadStatResult$ = cold('-a|', { a: fileUploadStatResult });
    const expected$ = cold('-(b|)', { b: true });

    getFileUploadStats.mockReturnValue(fileUploadStatResult$);

    const activate$ = guard.canActivate();

    expect(activate$).toBeObservable(expected$);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadFileUploadStatsSuccess(fileUploadStatResult));
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should resolve to false and navigate to technical error page on failures', () => {
    const error$ = cold('--#');

    getFileUploadStats.mockReturnValue(error$);

    const activate$ = guard.canActivate();

    expect(store.dispatch).not.toHaveBeenCalled();
    navigate.mockReturnValue(Promise.resolve(true));
    activate$.subscribe(value => {
      expect(value).toBeFalsy();
      expect(navigate).toHaveBeenCalledWith(['/technical-error']);
    });
  });
});
