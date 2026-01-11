import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { pcfReferencedataReducer, PcfReferenceDataState } from '../../../../../core/reducers/pcf-reference-data';
import { FormsModule } from '@angular/forms';
import { EthnicityCode } from '../../../../../core/model/reference-data-interfaces';
import { By } from '@angular/platform-browser';
import { LoadObservedEthnicitiesAction, LoadObservedEthnicitiesSuccessAction } from '../../../../../core/actions';
import { EthnicityCodeAutoSuggestComponent } from '../ethnicity-code-auto-suggest.component';
import { PdkForm, PdkFormFieldComponent } from '@cpp/pdk';

describe('EthnicityCodeAutoSuggestComponent', () => {
  const ethnicityCodes = [
    {
      id: 'id',
      ethnicityCode: 'asian',
      ethnicityDescription: 'Asian'
    },
    {
      id: 'id1',
      ethnicityCode: 'ir',
      ethnicityDescription: 'Irish'
    }
  ];

  let fixture: ComponentFixture<EthnicityCodeAutoSuggestTestComponent>;
  let store: Store<PcfReferenceDataState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EthnicityCodeAutoSuggestTestComponent,
        EthnicityCodeAutoSuggestComponent,
        PdkForm,
        PdkFormFieldComponent,
        FormsModule
      ],
      providers: [
        provideStore(
          {
            pcfReferenceData: pcfReferencedataReducer
          },
          {
            runtimeChecks: {}
          }
        )
      ]
    });

    fixture = TestBed.createComponent(EthnicityCodeAutoSuggestTestComponent);

    store = TestBed.inject(Store);
  });

  it('should render correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should set the default value and submit', async () => {
    store.dispatch(new LoadObservedEthnicitiesSuccessAction(ethnicityCodes));

    fixture.componentInstance.selectedValue = 'ir';
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(fixture.componentInstance.submitForm.mock.calls).toMatchSnapshot();
  });

  it('should set ethnicity object when `mapToKey` is not set', async () => {
    store.dispatch(new LoadObservedEthnicitiesSuccessAction(ethnicityCodes));

    fixture.componentInstance.mapSelectionToKey = false;
    fixture.componentInstance.selectedValue = 'ir';

    fixture.detectChanges();
    await fixture.whenStable();

    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(fixture.componentInstance.submitForm.mock.calls).toMatchSnapshot();
  });

  it('should be able to change value', async () => {
    store.dispatch(new LoadObservedEthnicitiesSuccessAction(ethnicityCodes));

    fixture.componentInstance.mapSelectionToKey = false;
    fixture.componentInstance.selectedValue = 'ir';

    fixture.detectChanges();
    await fixture.whenStable();

    const textInput = fixture.debugElement.query(By.css('input[type="text"]'));

    textInput.nativeElement.value = 'Asian';
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
    fixture.componentInstance.getEthnicityCodeOnMount = true;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(store.dispatch).toHaveBeenCalledWith(new LoadObservedEthnicitiesAction());
  });
});

@Component({
  selector: 'ethnicity-code-auto-suggest-test',
  template: `
    <form autocomplete="off" pdk-form novalidate (validSubmit)="submitForm(form.value)" #form="ngForm">
      <pdk-form-field label="EthnicityCode">
        <ethnicity-code-auto-suggest
          id="ethnicityCodeId"
          name="ethnicityCode"
          [ngModel]="selectedValue"
          [getEthnicityCodeOnMount]="getEthnicityCodeOnMount"
          [mapSelectionToKey]="mapSelectionToKey"
        >
        </ethnicity-code-auto-suggest>
      </pdk-form-field>
      <button type="submit">Submit</button>
    </form>
  `,
  imports: [FormsModule, PdkForm, PdkFormFieldComponent, EthnicityCodeAutoSuggestComponent]
})
class EthnicityCodeAutoSuggestTestComponent {
  selectedValue;
  suggestionKey: keyof EthnicityCode;
  getEthnicityCodeOnMount = false;
  mapSelectionToKey = true;
  submitForm = jest.fn();
}
