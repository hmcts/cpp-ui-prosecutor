import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  pcfReferencedataReducer,
  PcfReferenceDataState,
} from '../../../../../core/reducers/pcf-reference-data';
import { PdkAutosuggestModule, PdkCoreModule, PdkFormModule, PdkTextInputModule } from '@cpp/pdk';
import { FormsModule } from '@angular/forms';
import { Ethnicity } from '../../../../../core/model/reference-data-interfaces';
import { By } from '@angular/platform-browser';
import { LoadEthnicitiesAction, LoadEthnicitiesSuccessAction } from '../../../../../core/actions';
import { EthnicityAutoSuggestComponent } from '../ethnicity-auto-suggest.component';

describe('EthnicityAutoSuggestComponent', () => {
  const ethnicityList = [
    {
      id: 'id',
      sequence: 0,
      code: 'br',
      description: 'British',
    },
    {
      id: 'id1',
      sequence: 0,
      code: 'ir',
      description: 'Irish',
    },
  ];

  let fixture: ComponentFixture<EthnicityAutoSuggestTestComponent>;
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
      declarations: [EthnicityAutoSuggestComponent, EthnicityAutoSuggestTestComponent],
    });

    fixture = TestBed.createComponent(EthnicityAutoSuggestTestComponent);

    store = TestBed.get(Store);
  });

  it('should render correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should set the default value and submit', async () => {
    store.dispatch(new LoadEthnicitiesSuccessAction(ethnicityList));

    fixture.componentInstance.selectedValue = 'id1';
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(fixture.componentInstance.submitForm.mock.calls).toMatchSnapshot();
  });

  it('should set ethnicity object when `mapToKey` is not set', async () => {
    store.dispatch(new LoadEthnicitiesSuccessAction(ethnicityList));

    fixture.componentInstance.mapSelectionToKey = false;
    fixture.componentInstance.selectedValue = 'id1';

    fixture.detectChanges();
    await fixture.whenStable();

    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(fixture.componentInstance.submitForm.mock.calls).toMatchSnapshot();
  });

  it('should be able to change value', async () => {
    store.dispatch(new LoadEthnicitiesSuccessAction(ethnicityList));

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

  it('should dispatch action to load  ethnicity code', async () => {
    spyOn(store, 'dispatch');
    fixture.componentInstance.getEthnicitiesOnMount = true;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(store.dispatch).toHaveBeenCalledWith(new LoadEthnicitiesAction());
  });
});

@Component({
  selector: 'ethnicity-auto-suggest-test',
  template: `
    <form
      autocomplete="off"
      pdk-form
      novalidate
      (validSubmit)="submitForm(form.value)"
      #form="ngForm"
    >
      <pdk-form-field label="Ethnicity">
        <ethnicity-auto-suggest
          id="EthnicityId"
          name="Ethnicity"
          [ngModel]="selectedValue"
          [getEthnicitiesOnMount]="getEthnicitiesOnMount"
          [mapSelectionToKey]="mapSelectionToKey"
        >
        </ethnicity-auto-suggest>
      </pdk-form-field>
      <button type="submit">Submit</button>
    </form>
  `,
})
class EthnicityAutoSuggestTestComponent {
  selectedValue;
  suggestionKey: keyof Ethnicity;
  getEthnicitiesOnMount = false;
  mapSelectionToKey = true;
  submitForm = jest.fn();
}
