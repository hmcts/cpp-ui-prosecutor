import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { State } from '../../../reducers';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { CheckCsvUploadGuard } from '../check-csv-upload.guard';
import { CsvFileUploadDetails, StagingTflService, UploadStatus } from '../../../contexts/staging-tfl';
import { csvFileUploadReducer } from '../check-csv-upload.reducer';
import { LoadCsvFileUploadDetailsSuccess } from '../check-csv-upload.action';

describe('CheckCsvUploadGuard', () => {
  let checkCsvUploadGuard: CheckCsvUploadGuard;
  let store: Store<State>;
  let getCsvFilesUploadDetails: jest.Mock;
  let navigate: jest.Mock;

  beforeEach(() => {
    getCsvFilesUploadDetails = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      declarations: [],
      imports: [StoreModule.forRoot(csvFileUploadReducer)],
      providers: [
        CheckCsvUploadGuard,
        {
          provide: StagingTflService,
          useValue: {
            getCsvFilesUploadDetails
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

    checkCsvUploadGuard = TestBed.get(CheckCsvUploadGuard);
    store = TestBed.get(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should call the service and load data', () => {
    const mockFileUploadDetails = {
      headerFilename: 'fileName.csv',
      uploadId: 'uploadId',
      uploadStatus: {
        status: 'SUCCEEDED'
      } as UploadStatus
    } as CsvFileUploadDetails;

    const csvUploadDataDetails$ = cold('-a|', { a: [mockFileUploadDetails] });
    const expected$ = cold('-(b|)', { b: true });

    getCsvFilesUploadDetails.mockReturnValue(csvUploadDataDetails$);

    const activate$ = checkCsvUploadGuard.canActivate();

    expect(activate$).toBeObservable(expected$);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadCsvFileUploadDetailsSuccess([mockFileUploadDetails]));
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should resolve to false and navigate to technical error page on failures', () => {
    const error$ = cold('--#');

    getCsvFilesUploadDetails.mockReturnValue(error$);

    const activate$ = checkCsvUploadGuard.canActivate();

    expect(store.dispatch).not.toHaveBeenCalled();
    navigate.mockReturnValue(Promise.resolve(true));
    activate$.subscribe(value => {
      expect(value).toBeFalsy();
      expect(navigate).toHaveBeenCalledWith(['/technical-error']);
    });
  });
});
