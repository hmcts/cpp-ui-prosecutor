import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { State } from '../../../reducers';
import { ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { CsvFileUploadReport, StagingTflService } from '../../../contexts/staging-tfl';
import { ViewCsvUploadReportGuard } from '../view-csv-upload-report.guard';
import { csvFileUploadReportReducer } from '../view-csv-upload-report.reducer';
import { LoadCsvUploadReportSuccess } from '../view-csv-upload-report.action';

describe('ViewCsvUploadReportGuard', () => {
  let viewCsvUploadReportGuard: ViewCsvUploadReportGuard;
  let store: Store<State>;
  let getCsvFileUploadReport: jest.Mock;
  let navigate: jest.Mock;
  const snapshot = { params: { uploadId: 'uploadId' } as Params } as ActivatedRouteSnapshot;

  beforeEach(() => {
    getCsvFileUploadReport = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      declarations: [],
      imports: [StoreModule.forRoot(csvFileUploadReportReducer)],
      providers: [
        ViewCsvUploadReportGuard,
        {
          provide: StagingTflService,
          useValue: {
            getCsvFileUploadReport
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

    viewCsvUploadReportGuard = TestBed.get(ViewCsvUploadReportGuard);
    store = TestBed.get(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should call the service and load data', () => {
    const mockUploadReport = {
      uploadId: 'uploadID',
      headerFilename: 'headerFileName.csv'
    } as CsvFileUploadReport;

    const csvUploadDataDetails$ = cold('-a|', { a: mockUploadReport });
    const expected$ = cold('-(b|)', { b: true });

    getCsvFileUploadReport.mockReturnValue(csvUploadDataDetails$);

    const activate$ = viewCsvUploadReportGuard.canActivate(snapshot);

    expect(activate$).toBeObservable(expected$);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadCsvUploadReportSuccess(mockUploadReport));
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should resolve to false and navigate to technical error page on failures', () => {
    const error$ = cold('--#');

    getCsvFileUploadReport.mockReturnValue(error$);

    const activate$ = viewCsvUploadReportGuard.canActivate(snapshot);

    expect(store.dispatch).not.toHaveBeenCalled();
    navigate.mockReturnValue(Promise.resolve(true));
    activate$.subscribe(value => {
      expect(value).toBeFalsy();
      expect(navigate).toHaveBeenCalledWith(['/technical-error']);
    });
  });
});
