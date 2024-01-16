import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdkAlertModule, PdkCoreModule } from '@cpp/pdk';

import { DefendantDetailsChangeAlertComponent } from '../defendant-details-change-alert.component';
import { LegalEntityDetails, PersonalDetails } from '../../../../contexts/sjp';
import { MOCK_CASE, MOCK_CASE_LEGAL_ENTITY_DEFENDANT } from '../../../__tests__/test-mock-data';

describe('DefendantDetailsChangeAlertComponent -> person defendant', () => {
  let fixture: ComponentFixture<MockPersonDetailsChangeAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefendantDetailsChangeAlertComponent, MockPersonDetailsChangeAlertComponent],
      imports: [PdkAlertModule, PdkCoreModule],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(MockPersonDetailsChangeAlertComponent);
    fixture.componentInstance.personalDetails = MOCK_CASE.defendant.personalDetails;
  });

  it('should display red banner with name changed', () => {
    fixture.componentInstance.personalDetails.nameChanged = true;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const alertMessage = compiled.querySelector('pdk-alert');
    expect(alertMessage.textContent).toContain('The following defendant details have been updated:');
    expect(alertMessage.textContent).toContain('Name');
    expect(fixture).toMatchSnapshot();
  });

  it('should display red banner with address changed', () => {
    fixture.componentInstance.personalDetails.addressChanged = true;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const alertMessage = compiled.querySelector('pdk-alert');
    expect(alertMessage.textContent).toContain('The following defendant details have been updated:');
    expect(alertMessage.textContent).toContain('Address details');
    expect(fixture).toMatchSnapshot();
  });

  it('should display red banner with dob changed', () => {
    fixture.componentInstance.personalDetails.dobChanged = true;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const alertMessage = compiled.querySelector('pdk-alert');
    expect(alertMessage.textContent).toContain('The following defendant details have been updated:');
    expect(alertMessage.textContent).toContain('Date of birth');
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'defendant-details-change-alert-test',
    template: `
      <defendant-details-change-alert [personalDetails]="personalDetails"> </defendant-details-change-alert>
    `
  })
  class MockPersonDetailsChangeAlertComponent {
    @Input() personalDetails: PersonalDetails;
  }
});

describe('DefendantDetailsChangeAlertComponent -> Legal entity defendant', () => {
  let fixture: ComponentFixture<MockLegalEntityDetailsChangeAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefendantDetailsChangeAlertComponent, MockLegalEntityDetailsChangeAlertComponent],
      imports: [PdkAlertModule, PdkCoreModule],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(MockLegalEntityDetailsChangeAlertComponent);
    fixture.componentInstance.legalEntityDetails = MOCK_CASE_LEGAL_ENTITY_DEFENDANT.defendant.legalEntityDetails;
  });

  it('should display red banner with name changed', () => {
    fixture.componentInstance.legalEntityDetails.legalEntityNameChanged = true;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const alertMessage = compiled.querySelector('pdk-alert');
    expect(alertMessage.textContent).toContain('The following defendant details have been updated:');
    expect(alertMessage.textContent).toContain('Name');
    expect(fixture).toMatchSnapshot();
  });

  it('should display red banner with address changed', () => {
    fixture.componentInstance.legalEntityDetails.addressChanged = true;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const alertMessage = compiled.querySelector('pdk-alert');
    expect(alertMessage.textContent).toContain('The following defendant details have been updated:');
    expect(alertMessage.textContent).toContain('Address details');
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'defendant-details-change-alert-test',
    template: `
      <defendant-details-change-alert [legalEntityDetails]="legalEntityDetails"> </defendant-details-change-alert>
    `
  })
  class MockLegalEntityDetailsChangeAlertComponent {
    @Input() legalEntityDetails: LegalEntityDetails;
  }
});
