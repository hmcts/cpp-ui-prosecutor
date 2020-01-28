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
import { DefendantDetailsComponent } from '../defendant-details.component';
import { CommonModule } from '@angular/common';
import { PersonalDetails } from '../../../../contexts/sjp';

describe('DefendantDetailsComponent', () => {
  let fixture: ComponentFixture<TestDefendantDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefendantDetailsComponent, TestDefendantDetailsComponent, MockDateOfBirthComponent],
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
    fixture = TestBed.createComponent(TestDefendantDetailsComponent);
    fixture.componentInstance.defendantDetails = MOCK_CASE.defendant.personalDetails;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'defendant-details-test',
    template: `
      <defendant-details [defendantDetails]="defendantDetails"> </defendant-details>
    `
  })
  class TestDefendantDetailsComponent {
    defendantDetails: PersonalDetails;
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
