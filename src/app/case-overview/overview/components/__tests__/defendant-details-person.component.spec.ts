import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { PdkCoreModule, PdkGridModule, PdkPageHeaderModule } from '@cpp/pdk';
import { MOCK_CASE } from '../../../__tests__/test-mock-data';
import {
  AgePipeModule,
  CaseStatusPipeModule,
  DefendantNamePipeModule,
  FormatAddressPipeModule,
  FormatDatePipeModule,
  IfEmptyPipeModule
} from '../../../../shared/pipes';
import { DefendantDetailsPersonComponent } from '../defendant-details-person.component';
import { CommonModule } from '@angular/common';
import { PersonalDetails } from '../../../../contexts/sjp';

describe('DefendantDetailsPersonComponent', () => {
  let fixture: ComponentFixture<TestDefendantDetailsPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefendantDetailsPersonComponent, TestDefendantDetailsPersonComponent, MockDateOfBirthComponent],
      imports: [
        CommonModule,
        PdkCoreModule,
        PdkPageHeaderModule,
        PdkGridModule,
        AgePipeModule,
        IfEmptyPipeModule,
        DefendantNamePipeModule,
        CaseStatusPipeModule,
        FormatDatePipeModule,
        FormatAddressPipeModule
      ]
    });

    Date.now = jest.fn(() => Date.parse('2017-02-14'));
    fixture = TestBed.createComponent(TestDefendantDetailsPersonComponent);
    fixture.componentInstance.personDetails = MOCK_CASE.defendant.personalDetails;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'defendant-details-test',
    template: `
      <defendant-details-person [personDetails]="personDetails"> </defendant-details-person>
    `
  })
  class TestDefendantDetailsPersonComponent {
    personDetails: PersonalDetails;
  }

  @Component({
    selector: 'date-of-birth',
    template: `
      <div>dateOfBirth: {{ dateOfBirth }}</div>
      <div>defaultSubstitute: {{ defaultSubstitute }}</div>
    `
  })
  class MockDateOfBirthComponent {
    @Input() dateOfBirth: string;
    @Input() defaultSubstitute = '–';
  }
});
