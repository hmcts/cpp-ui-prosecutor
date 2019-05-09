import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { reducers } from '../../reducers';
import { TflEffects } from '../tfl.effects';
import { StagingTflService } from '../../contexts/staging-tfl';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { UploadDocuments, UploadDocumentsSuccess } from '../tfl.action';
import { cold, hot } from 'jasmine-marbles';
import { ApiError } from '../../core/actions';

describe('TflEffects', () => {
  let tflEffects: TflEffects;
  let uploadDocuments: jest.Mock;
  let actions$: Observable<any>;
  let store;

  beforeEach(() => {
    uploadDocuments = jest.fn();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot(reducers)],
      providers: [
        TflEffects,
        {
          provide: StagingTflService,
          useValue: {
            uploadDocuments
          }
        },
        provideMockActions(() => actions$)
      ]
    });
    tflEffects = TestBed.get(TflEffects);
    store = TestBed.get(Store);
  });

  describe('uploadDocuments$', () => {
    it('should upload documents', () => {
      const zipFile = new File(['file1'], 'filename1', { type: 'zip' });
      actions$ = hot('-a|', { a: new UploadDocuments(zipFile) });

      uploadDocuments.mockReturnValue(cold('-b|', { b: {} }));

      const expected$ = cold('--c|', {
        c: new UploadDocumentsSuccess()
      });

      expect(tflEffects.uploadDocuments$).toBeObservable(expected$);
    });

    it('should throw errors', () => {
      const error = { status: 404 };
      const zipFile = new File(['file1'], 'filename1', { type: 'zip' });
      actions$ = hot('-a|', { a: new UploadDocuments(zipFile) });
      uploadDocuments.mockReturnValue(cold('-#', {}, error));
      const expected$ = cold('--(b|)', {
        b: new ApiError(error)
      });
      expect(tflEffects.uploadDocuments$).toBeObservable(expected$);
    });
  });
});
