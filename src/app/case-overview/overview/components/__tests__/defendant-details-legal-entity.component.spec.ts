import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { MOCK_CASE_LEGAL_ENTITY_DEFENDANT } from '../../../__tests__/test-mock-data';
import { LegalEntityDetails } from '../../../../contexts/sjp';
import { DefendantDetailsLegalEntityComponent } from '../defendant-details-legal-entity.component';

describe('DefendantDetailsLegalEntityComponent', () => {
  let fixture: ComponentFixture<TestDefendantDetailsLegalEntityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestDefendantDetailsLegalEntityComponent, DefendantDetailsLegalEntityComponent],
      teardown: { destroyAfterEach: false }
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
    `,
    imports: [DefendantDetailsLegalEntityComponent]
  })
  class TestDefendantDetailsLegalEntityComponent {
    @Input() legalEntityDetails: LegalEntityDetails;
  }
});
