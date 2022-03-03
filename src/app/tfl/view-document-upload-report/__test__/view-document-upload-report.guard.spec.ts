import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { State } from '../../../reducers';
import { ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { DocumentUploadDetails, StagingTflService } from '../../../contexts/staging-tfl';
import { ViewDocumentUploadReportGuard } from '../view-document-upload-report.guard';
import { documentUploadReportReducer } from '../view-document-upload-report.reducer';
import { LoadDocumentUploadReportSuccess } from '../view-document-upload-report.action';

describe('ViewDocumentUploadReportGuard', () => {
  let viewDocumentUploadReportGuard: ViewDocumentUploadReportGuard;
  let store: Store<State>;
  let getDocumentUploadReport: jest.Mock;
  let navigate: jest.Mock;
  const snapshot = { params: { bundleUploadId: 'uploadId' } as Params } as ActivatedRouteSnapshot;

  beforeEach(() => {
    getDocumentUploadReport = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      declarations: [],
      imports: [StoreModule.forRoot(documentUploadReportReducer, {runtimeChecks: {}})],
      providers: [
        ViewDocumentUploadReportGuard,
        {
          provide: StagingTflService,
          useValue: {
            getDocumentUploadReport
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

    viewDocumentUploadReportGuard = TestBed.get(ViewDocumentUploadReportGuard);
    store = TestBed.get(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should call the service and load data', () => {
    const mockUploadReport = {
      bundleUploadId: 'uploadID'
    } as DocumentUploadDetails;

    const documentUploadDataDetails$ = cold('-a|', { a: mockUploadReport });
    const expected$ = cold('-(b|)', { b: true });

    getDocumentUploadReport.mockReturnValue(documentUploadDataDetails$);

    const activate$ = viewDocumentUploadReportGuard.canActivate(snapshot);

    expect(activate$).toBeObservable(expected$);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadDocumentUploadReportSuccess(mockUploadReport));
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should resolve to false and navigate to technical error page on failures', () => {
    const error$ = cold('--#');

    getDocumentUploadReport.mockReturnValue(error$);

    const activate$ = viewDocumentUploadReportGuard.canActivate(snapshot);

    expect(store.dispatch).not.toHaveBeenCalled();
    navigate.mockReturnValue(Promise.resolve(true));
    activate$.subscribe(value => {
      expect(value).toBeFalsy();
      expect(navigate).toHaveBeenCalledWith(['/technical-error']);
    });
  });
});
