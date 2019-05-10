import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdkAlertModule, PdkCoreModule } from '@cpp/pdk';

import { PersonalDetailsChangeAlertComponent } from '../personal-details-change-alert.component';
import { PersonalDetails } from '../../../../contexts/sjp';
import { MOCK_CASE } from '../../../__tests__/test-mock-data';

describe('PeronalDetailsChangeAlertComponent', () => {
  let fixture: ComponentFixture<MockPersonalDetailsChangeAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalDetailsChangeAlertComponent, MockPersonalDetailsChangeAlertComponent],
      imports: [PdkAlertModule, PdkCoreModule]
    });

    fixture = TestBed.createComponent(MockPersonalDetailsChangeAlertComponent);
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
    selector: 'personal-details-change-alert-test',
    template: `
      <personal-details-change-alert [personalDetails]="personalDetails"> </personal-details-change-alert>
    `
  })
  class MockPersonalDetailsChangeAlertComponent {
    @Input() personalDetails: PersonalDetails;
  }
});
