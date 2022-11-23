import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { PdkCoreModule, PdkGridModule, PdkPageHeaderModule } from '@cpp/pdk';
import { MOCK_CASE_LEGAL_ENTITY_DEFENDANT } from '../../../__tests__/test-mock-data';
import {
  AgePipeModule,
  CaseStatusPipeModule,
  DefendantNamePipeModule,
  FormatAddressPipeModule,
  FormatDatePipeModule,
  IfEmptyPipeModule
} from '../../../../shared/pipes';
import { CommonModule } from '@angular/common';
import { LegalEntityDetails } from '../../../../contexts/sjp';
import { DefendantDetailsLegalEntityComponent } from '../defendant-details-legal-entity.component';

describe('DefendantDetailsPersonComponent', () => {
  let fixture: ComponentFixture<TestDefendantDetailsLegalEntityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefendantDetailsLegalEntityComponent, TestDefendantDetailsLegalEntityComponent],
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
    fixture = TestBed.createComponent(TestDefendantDetailsLegalEntityComponent);
    fixture.componentInstance.legalEntityDetails = MOCK_CASE_LEGAL_ENTITY_DEFENDANT.defendant.legalEntityDetails;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'defendant-details-test',
    template: `
      <defendant-details-legal-entity [legalEntityDetails]="legalEntityDetails"> </defendant-details-legal-entity>
    `
  })
  class TestDefendantDetailsLegalEntityComponent {
    @Input() legalEntityDetails: LegalEntityDetails;
  }

});
