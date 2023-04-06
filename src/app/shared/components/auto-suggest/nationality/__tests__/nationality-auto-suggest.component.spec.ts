import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  pcfReferencedataReducer,
  PcfReferenceDataState,
} from '../../../../../core/reducers/pcf-reference-data';
import { NationalityAutoSuggestComponent } from '../nationality-auto-suggest.component';
import { PdkAutosuggestModule, PdkCoreModule, PdkFormModule, PdkTextInputModule } from '@cpp/pdk';
import { FormsModule } from '@angular/forms';
import { Nationality } from '../../../../../core/model/reference-data-interfaces';
import { By } from '@angular/platform-browser';
import {
  LoadNationalitiesAction,
  LoadNationalitieSuccessAction,
} from '../../../../../core/actions';

describe('NationalityAutoSuggestComponent', () => {
  const nationalities = [
    {
      id: 'id',
      cjsCode: 1,
      isoCode: 'GBR',
      govCode: 'GBR',
      countryName: 'GBR',
      nationality: 'British',
    },
    {
      id: 'id1',
      cjsCode: 1,
      isoCode: 'GBR',
      govCode: 'GBR',
      countryName: 'GBR',
      nationality: 'Irish',
    },
  ];

  let fixture: ComponentFixture<NationalityAutoSuggestTestComponent>;
  let store: Store<PcfReferenceDataState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        PdkFormModule,
        PdkAutosuggestModule,
        PdkCoreModule,
        PdkTextInputModule,
        StoreModule.forRoot(() => null, {
          runtimeChecks: {},
        }),
        StoreModule.forFeature('pcfReferenceData', pcfReferencedataReducer),
      ],
      declarations: [NationalityAutoSuggestComponent, NationalityAutoSuggestTestComponent],
    });

    fixture = TestBed.createComponent(NationalityAutoSuggestTestComponent);

    store = TestBed.get(Store);
  });

  it('should render the component correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should set the default value and submit', async () => {
    store.dispatch(new LoadNationalitieSuccessAction(nationalities));

    fixture.componentInstance.selectedValue = 'id1';
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(fixture.componentInstance.submitForm.mock.calls).toMatchSnapshot();
  });

  it('should set nationality object when `mapToKey` is not set', async () => {
    store.dispatch(new LoadNationalitieSuccessAction(nationalities));

    fixture.componentInstance.mapSelectionToKey = false;
    fixture.componentInstance.selectedValue = 'id1';

    fixture.detectChanges();
    await fixture.whenStable();

    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(fixture.componentInstance.submitForm.mock.calls).toMatchSnapshot();
  });

  it('should be able to change value', async () => {
    store.dispatch(new LoadNationalitieSuccessAction(nationalities));

    fixture.componentInstance.mapSelectionToKey = false;
    fixture.componentInstance.selectedValue = 'id1';

    fixture.detectChanges();
    await fixture.whenStable();

    const textInput = fixture.debugElement.query(By.css('input[type="text"]'));

    textInput.nativeElement.value = 'British';
    textInput.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    fixture.debugElement.query(By.css('[role="listbox"] div')).nativeElement.click();

    fixture.detectChanges();
    await fixture.whenStable();

    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(fixture.componentInstance.submitForm.mock.calls).toMatchSnapshot();
  });

  it('should dispatch action to load  nationality', async () => {
    spyOn(store, 'dispatch');
    fixture.componentInstance.getNationalitiesOnMount = true;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(store.dispatch).toHaveBeenCalledWith(new LoadNationalitiesAction());
  });
});

@Component({
  selector: 'nationality-auto-suggest-test',
  template: `
    <form
      autocomplete="off"
      pdk-form
      novalidate
      (validSubmit)="submitForm(form.value)"
      #form="ngForm"
    >
      <pdk-form-field label="Nationality">
        <nationality-auto-suggest
          id="nationalityId"
          name="nationality"
          [ngModel]="selectedValue"
          [getNationalitiesOnMount]="getNationalitiesOnMount"
          [mapSelectionToKey]="mapSelectionToKey"
        >
        </nationality-auto-suggest>
      </pdk-form-field>
      <button type="submit">Submit</button>
    </form>
  `,
})
class NationalityAutoSuggestTestComponent {
  selectedValue;
  suggestionKey: keyof Nationality;
  getNationalitiesOnMount = false;
  mapSelectionToKey = true;
  submitForm = jest.fn();
}
