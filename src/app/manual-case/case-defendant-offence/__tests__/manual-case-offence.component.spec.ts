import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, Location } from '@angular/common';
import { ManualCaseOffenceComponent } from '../manual-case-offence.component';
import { ManualCaseOffenceStateService } from '../../offences-state.service';
import { OffenceParsingService } from '../../case-offence-parsing/offence-parsing.service';
import { ManualCaseDefendant } from '../../../core/model';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  FormFieldControl,
  PdkAutosuggestModule,
  PdkCheckboxInputModule,
  PdkCoreModule,
  PdkCurrencyInputModule,
  PdkDateInputModule,
  PdkFormModule,
  PdkGridModule,
  PdkInputModule,
  PdkInsetTextModule,
  PdkRadioInputModule,
  PdkSelectModule,
  PdkTextareaModule,
  PdkTextInputModule
} from '@cpp/pdk';
import { MockPipesModule } from '../../../shared/pipes/mock-pipes';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { OffenceWordingService } from '../../case-offence-parsing/offence-wording.service';
import { PCFReferenceDataOffenceService } from '../../../contexts/reference-data/pcf-reference-data-offence';
import { DynamicParticularFormComponent } from '../dynamic-particular-form.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { take } from 'rxjs/operators';

const emptyOffence = {};
const expectedDefendantsToStore = [{ id: 'def 001' }, { id: 'def 002' }];
const manualCaseDefendants = [
  {
    id: '46e1c5f5-5e91-4655-9eda-43368640f218',
    individual: {
      personalInformation: {
        title: 'Mr',
        firstName: 'Defendant',
        lastName: 'One'
      }
    },
    offences: [
      {
        offenceCode: 'RT88584B',
        offenceSequenceNumber: 1,
        offenceDateCode: 4,
        offenceCommittedDate: '2018-01-01',
        offenceCommittedEndDate: '2018-02-02',
        offenceWording: 'Caught Driving On Phone'
      }
    ]
  },
  {
    id: '7e967376-eacf-4fca-9b30-21b0c5aad427',
    individual: {
      personalInformation: {
        title: 'Mr',
        firstName: 'Defendant',
        lastName: 'One'
      }
    }
  }
] as ManualCaseDefendant[];

const particularFormModel = {
  title: 'Offence title',
  sections: [
    {
      type: 'DROPDOWN',
      label: 'Offence date type'
    },
    {
      type: 'DATE',
      label: 'Specify Date'
    },
    {
      type: 'LABEL',
      label: 'occurring at'
    },
    {
      type: 'TEXT',
      label: 'Specify township'
    },
    {
      type: 'LIST',
      list: [
        {
          type: 'RADIO',
          label: 'Allowed another, namely',
          children: [
            {
              type: 'TEXT',
              label: 'Specify person'
            },
            {
              type: 'LABEL',
              label: 'to have possession of an official document, namely'
            }
          ]
        }
      ]
    }
  ]
};

const offenceDateCodes = [
  {
    id: '4aaecac5-222b-402d-9047-84803679edac',
    dateCode: '1',
    dateCodeDescription: 'before'
  },
  {
    id: '5aaecac5-222b-402d-9047-84803679edac',
    dateCode: '2',
    dateCodeDescription: 'after'
  },
  {
    id: '6b07adbc-2d61-40a3-b790-7ed8c8b52e3e',
    dateCode: '4',
    dateCodeDescription: 'between'
  }
];

const alcoholLevelMethods = [
  {
    id: 'f833257e-e355-4c72-838b-d236db530226',
    methodCode: 'B01',
    methodDescription: 'Breath'
  },
  {
    id: 'd15a29d0-68b4-4a4f-8c46-c1316d7238eb',
    methodCode: 'B02',
    methodDescription: 'Blood'
  }
];

describe('Manual Case Offence Component', () => {
  window.scroll = jest.fn();

  let component: ManualCaseOffenceComponent;
  let fixture: ComponentFixture<ManualCaseOffenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManualCaseOffenceComponent, DynamicParticularFormComponent, MockOffenceSearchComponent],
      imports: [
        MockPipesModule,
        CommonModule,
        FormsModule,
        PdkCoreModule,
        PdkFormModule,
        PdkGridModule,
        PdkInputModule,
        PdkTextInputModule,
        PdkCurrencyInputModule,
        PdkInsetTextModule,
        PdkAutosuggestModule,
        PdkRadioInputModule,
        MockPipesModule,
        PdkSelectModule,
        PdkTextareaModule,
        PdkGridModule,
        PdkCheckboxInputModule,
        PdkDateInputModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: Location,
          useValue: {
            back: () => undefined
          }
        },
        {
          provide: ManualCaseOffenceStateService,
          useValue: {
            initialise: () => jest.fn(),
            load: () => manualCaseDefendants[0].offences[0],
            previous: () => manualCaseDefendants[0].offences[0],
            addNew: () => emptyOffence,
            next: () => null,
            getDefendantOptions: () => [],
            getSelectedDefendantIds: () => [],
            mapOffenceToDefendants: () => expectedDefendantsToStore
          }
        },
        {
          provide: OffenceParsingService,
          useValue: {
            parse: () => particularFormModel
          }
        },
        {
          provide: OffenceWordingService,
          useValue: {
            buildParticularWording: () => 'dynamic particular wording'
          }
        },
        {
          provide: PCFReferenceDataOffenceService,
          useValue: {
            getOffenceTypeById: () =>
              of({
                cjsOffenceCode: manualCaseDefendants[0].offences[0].offenceCode,
                standardoffencewording: 'wording with placeholder',
                drugsOrAlcoholRelated: 'Y',
                backDutyAllowed: true
              }).pipe(take(1)),
            searchOffenceTypes: () => of(['id'])
          }
        }
      ]
    });

    fixture = TestBed.createComponent(ManualCaseOffenceComponent);
    component = fixture.componentInstance;

    component.manualCaseDefendants = manualCaseDefendants;
    component.offenceDateCodes = offenceDateCodes;
    component.alcoholLevelMethods = alcoholLevelMethods;
    component.iterateOffence = true;
    fixture.detectChanges();
  });

  it('should compile correctly and render the page', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly if AOCP eligible offence', () => {
    component.editOffence.aocpEligible = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should set the editOffence when update function gets called', () => {
    component.update({
      cjsOffenceCode: ':someCode',
      legislation: ':legislation',
      title: ':title'
    });

    expect(component.editOffence.offenceCode).toEqual(':someCode');
    expect(component.editOffence.offenceLegislation).toEqual(':legislation');
    expect(component.editOffence.offenceTitle).toEqual(':title');
  });

  it('should not show laid date if user is npp', async () => {
    await fixture.whenStable();

    component.manualCaseType = 'S';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.showChargeDate).toBeFalsy();
  });

  it('should show valid date input base on manual case type', async () => {
    await fixture.whenStable();

    component.manualCaseType = 'Q';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.showChargeDate).toBeTruthy();

    component.manualCaseType = 'C';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.showChargeDate).toBeTruthy();

    component.manualCaseType = 'J';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.showChargeDate).toBeTruthy();

    component.manualCaseType = 'C';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.showArrestDate).toBeTruthy();

    component.manualCaseType = 'S';
    component.hasNpp = true;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.showLaidDate).toBeTruthy();
  });

  it('should toggle selected defendant ids when select all is ticked', () => {
    component.toggleSelectAll(true);
    expect(component.selectedDefendantIds).toEqual([manualCaseDefendants[0].id, manualCaseDefendants[1].id]);

    component.toggleSelectAll(false);
    expect(component.selectedDefendantIds).toEqual([]);
  });

  it('should update selected defendants ids', () => {
    component.updateSelectedDefendants(['mocke-defendant-001-id', 'mocke-defendant-002-id']);

    expect(component.selectedDefendantIds).toEqual(['mocke-defendant-001-id', 'mocke-defendant-002-id']);
    expect(component.selectAll).toBeFalsy();
  });

  it('should trigger submitFormData when the ADD button is pressed and stay on the current page', async () => {
    const submitDataSpy = jest.spyOn(component.submitFormData, 'emit');
    fixture.debugElement.query(By.css(`button[data-role='add']`)).nativeElement.click();
    await fixture.whenStable();
    expect(component.editOffence).toMatchSnapshot();
    expect(submitDataSpy).toHaveBeenCalledWith({
      navigateToNextPage: false,
      defendantsWithOffences: expectedDefendantsToStore
    });
  });

  it('should trigger submitFormData when the CONTINUE button is pressed and navigate to next page', () => {
    const submitDataSpy = jest.spyOn(component.submitFormData, 'emit');
    fixture.debugElement.query(By.css(`button[data-role='continue']`)).nativeElement.click();
    expect(submitDataSpy).toHaveBeenCalledWith({
      navigateToNextPage: true,
      defendantsWithOffences: expectedDefendantsToStore
    });
  });

  it('should call back() to load the previous offence', async () => {
    component.back();
    expect(component.editOffence.offenceCode).toEqual(manualCaseDefendants[0].offences[0].offenceCode);
  });

  @Component({
    selector: 'offence-search',
    template: ``,
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MockOffenceSearchComponent),
        multi: true
      },
      {
        provide: FormFieldControl,
        useExisting: forwardRef(() => MockOffenceSearchComponent)
      }
    ]
  })
  class MockOffenceSearchComponent {
    input;

    propagateChange(fn: any): void {}

    registerOnChange(fn: any): void {
      this.propagateChange = fn.bind(this);
    }

    registerOnTouched(fn: any): void {}

    writeValue(input): void {
      this.input = input;
      this.propagateChange({ cjsOffenceCode: 'RT88584B' });
    }
  }
});
