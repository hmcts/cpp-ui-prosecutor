import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ViewYourFilesContainer } from '../view-your-files.container';
import { ManageYourComplaintsFilesService } from '../../../services/manage-your-complaints-files.service';

describe('real reference number validation flow (real store, real form validation)', () => {
  let fixture: ComponentFixture<ViewYourFilesContainer>;
  let searchComplaintsFiles: jest.Mock;

  beforeEach(() => {
    searchComplaintsFiles = jest.fn();

    TestBed.configureTestingModule({
      imports: [ViewYourFilesContainer],
      providers: [
        { provide: ManageYourComplaintsFilesService, useValue: { searchComplaintsFiles } },
        { provide: Store, useValue: { dispatch: jest.fn() } },
        { provide: ActivatedRoute, useValue: {} }
      ]
    });

    fixture = TestBed.createComponent(ViewYourFilesContainer);
    fixture.detectChanges();
  });

  const setReferenceNumber = (value: string) => {
    const input = fixture.debugElement.query(By.css('[data-role="search-input"]')).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  };

  const submit = () => {
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', new Event('submit'));
    fixture.detectChanges();
  };

  it('does not let an invalid reference number reach the search after a previous submission was rejected by the backend', () => {
    searchComplaintsFiles.mockReturnValueOnce(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: JSON.stringify({ error: 'Specified string aaa, is not valid UUID' })
          })
      )
    );
    setReferenceNumber('aaa');
    submit();
    expect(searchComplaintsFiles).toHaveBeenCalledTimes(1);

    setReferenceNumber('dummy id!');
    submit();

    expect(searchComplaintsFiles).toHaveBeenCalledTimes(1);
    expect(fixture.nativeElement.textContent).toContain(
      'Reference number must only contain letters, numbers and hyphens'
    );
  });

  it('lets a corrected reference number be searched again after a previous submission was rejected by the backend', () => {
    searchComplaintsFiles.mockReturnValueOnce(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: JSON.stringify({ error: 'Specified string aaa, is not valid UUID' })
          })
      )
    );
    setReferenceNumber('aaa');
    submit();
    expect(searchComplaintsFiles).toHaveBeenCalledTimes(1);

    searchComplaintsFiles.mockReturnValueOnce(of(null));
    setReferenceNumber('dummy-id-1');
    submit();

    expect(searchComplaintsFiles).toHaveBeenCalledTimes(2);
    expect(searchComplaintsFiles).toHaveBeenLastCalledWith('dummy-id-1');
  });
});
