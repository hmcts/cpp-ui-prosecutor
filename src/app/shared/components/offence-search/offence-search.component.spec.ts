import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { PdkCoreModule, PdkFormModule, PdkAutosuggestModule } from '@cpp/pdk';
import { of } from 'rxjs';

import { OffenceSearchComponent } from './offence-search.component';
import { PCFReferenceDataOffenceService } from '../../../contexts/reference-data/pcf-reference-data-offence';

describe('OffenceSearchComponent', () => {
  let fixture: ComponentFixture<TestOffenceSearchComponent>;
  let searchOffenceTypes: jest.Mock;
  let search: OffenceSearchComponent;

  beforeEach(() => {
    searchOffenceTypes = jest.fn();

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PdkCoreModule,
        PdkFormModule,
        RouterTestingModule,
        PdkAutosuggestModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OffenceSearchComponent, TestOffenceSearchComponent],
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

    const form = fixture.debugElement.children[0].injector.get(NgForm);

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
    `
  })
  class TestOffenceSearchComponent {
    noResult = false;
  }
});
