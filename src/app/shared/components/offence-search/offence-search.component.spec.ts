import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { OffenceSearchComponent } from './offence-search.component';
import { PCFReferenceDataOffenceService } from '../../../contexts/reference-data/pcf-reference-data-offence';
import { FormsModule, NgForm } from '@angular/forms';
import { PdkForm, PdkFormFieldComponent } from '@cpp/pdk';

describe('OffenceSearchComponent', () => {
  let fixture: ComponentFixture<TestOffenceSearchComponent>;
  let searchOffenceTypes: jest.Mock;
  let search: OffenceSearchComponent;

  beforeEach(() => {
    searchOffenceTypes = jest.fn();

    TestBed.configureTestingModule({
      imports: [FormsModule, TestOffenceSearchComponent, OffenceSearchComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: PCFReferenceDataOffenceService,
          useValue: {
            searchOffenceTypes
          }
        }
      ]
    });

    fixture = TestBed.createComponent(TestOffenceSearchComponent);
    fixture.detectChanges();
    search = fixture.debugElement.query(By.directive(OffenceSearchComponent)).componentInstance;
  });

  const offences = [
    {
      offenceId: '*',
      title: 'Making waves',
      cjsOffenceCode: 'CTO101',
      legislation: 'Bondi Beach'
    }
  ];

  it('should select a charge', () => {
    search.propagateChange(offences[0]);
    fixture.detectChanges();

    const formElement = fixture.debugElement.query(By.css('form'));
    const form = formElement.injector.get(NgForm);

    expect(form.value).toEqual({
      offence: {
        cjsOffenceCode: 'CTO101',
        legislation: 'Bondi Beach',
        offenceId: '*',
        title: 'Making waves'
      }
    });
  });

  describe('search', () => {
    let onResult: jest.Mock;

    beforeEach(() => {
      onResult = jest.fn();

      search.source$.subscribe(onResult);
    });

    it('should search once at least 3 characters are entered', () => {
      searchOffenceTypes.mockReturnValue(of(offences));
      search.input$.next('as');
      expect(onResult).not.toHaveBeenCalled();
      search.input$.next('ass');
      expect(searchOffenceTypes).toHaveBeenCalledWith('ass', 10, '');
      expect(onResult).toHaveBeenCalledWith([
        {
          id: offences[0].offenceId,
          label: '',
          offence: offences[0]
        }
      ]);
    });

    it('should show no results message no offences found', () => {
      search.noResult = true;
      fixture.detectChanges();
    });
  });

  @Component({
    selector: 'offence-search-test',
    template: `
      <form>
        <pdk-form-field label="test">
          <offence-search name="offence" [selectedOffenceCode]="'HAHA'" ngModel> </offence-search>
        </pdk-form-field>
      </form>
    `,
    imports: [OffenceSearchComponent, PdkFormFieldComponent, PdkForm, FormsModule]
  })
  class TestOffenceSearchComponent {
    noResult = false;
  }
});
