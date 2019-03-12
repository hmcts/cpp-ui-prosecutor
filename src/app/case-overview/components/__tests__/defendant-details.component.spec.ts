import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PdkCoreModule, PdkGridModule, PdkPageHeaderModule } from '@cpp/pdk';
import { MOCK_CASE } from '../../__tests__/test-mock-data';
import {
  AgePipeModule,
  CaseProsecutorPipeModule,
  CaseStatusPipeModule,
  DefendantNamePipeModule,
  FormatAddressPipeModule,
  FormatDatePipeModule,
  IfEmptyPipeModule
} from '../../../shared/pipes';
import { DefendantDetailsComponent } from '../defendant-details.component';
import { CommonModule } from '@angular/common';
import { PersonalDetails } from '../../../contexts/sjp';

describe('DefendantDetailsComponent', () => {
  let fixture: ComponentFixture<TestDefendantDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefendantDetailsComponent, TestDefendantDetailsComponent],
      imports: [
        CommonModule,
        PdkCoreModule,
        PdkPageHeaderModule,
        PdkGridModule,
        AgePipeModule,
        IfEmptyPipeModule,
        DefendantNamePipeModule,
        CaseStatusPipeModule,
        CaseProsecutorPipeModule,
        FormatDatePipeModule,
        FormatAddressPipeModule
      ]
    });

    Date.now = jest.fn(() => 1487076708000); // 14.02.2017
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
});
