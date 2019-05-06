import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { State } from '../../../reducers';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { CheckDocumentUploadGuard } from '../check-document-upload.guard';
import { DocumentUploadDetails, StagingTflService, UploadStatus } from '../../../contexts/staging-tfl';
import { documentUploadReducer } from '../check-document-upload.reducer';
import { LoadDocumentUploadDetailsSuccess } from '../document-upload.action';

describe('CheckDocumentUploadGuard', () => {
  let checkDocumentUploadGuard: CheckDocumentUploadGuard;
  let store: Store<State>;
  let getDocumentUploadDetails: jest.Mock;
  let navigate: jest.Mock;

  beforeEach(() => {
    getDocumentUploadDetails = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      declarations: [],
      imports: [StoreModule.forRoot(documentUploadReducer)],
      providers: [
        CheckDocumentUploadGuard,
        {
          provide: StagingTflService,
          useValue: {
            getDocumentUploadDetails
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

    checkDocumentUploadGuard = TestBed.get(CheckDocumentUploadGuard);
    store = TestBed.get(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should call the service and load data', () => {
    const mockDocumentUploadDetails = {
      zipFilename: 'fileName.zip',
      bundleUploadId: 'uploadId',
      uploadStatus: {
        status: 'SUCCEEDED'
      } as UploadStatus
    } as DocumentUploadDetails;

    const documentUploadDataDetails$ = cold('-a|', { a: [mockDocumentUploadDetails] });
    const expected$ = cold('-(b|)', { b: true });

    getDocumentUploadDetails.mockReturnValue(documentUploadDataDetails$);

    const activate$ = checkDocumentUploadGuard.canActivate();

    expect(activate$).toBeObservable(expected$);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadDocumentUploadDetailsSuccess([mockDocumentUploadDetails]));
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should resolve to false and navigate to technical error page on failures', () => {
    const error$ = cold('--#');

    getDocumentUploadDetails.mockReturnValue(error$);

    const activate$ = checkDocumentUploadGuard.canActivate();

    expect(store.dispatch).not.toHaveBeenCalled();
    navigate.mockReturnValue(Promise.resolve(true));
    activate$.subscribe(value => {
      expect(value).toBeFalsy();
      expect(navigate).toHaveBeenCalledWith(['/technical-error']);
    });
  });
});
