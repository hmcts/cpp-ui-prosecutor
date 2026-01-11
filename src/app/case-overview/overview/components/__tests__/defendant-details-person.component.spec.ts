import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { MOCK_CASE } from '../../../__tests__/test-mock-data';

import { DefendantDetailsPersonComponent } from '../defendant-details-person.component';
import { PersonalDetails } from '../../../../contexts/sjp';
import { DateOfBirthComponent } from '../../../../shared/date-of-birth/date-of-birth.component';

describe('DefendantDetailsPersonComponent', () => {
  let fixture: ComponentFixture<TestDefendantDetailsPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestDefendantDetailsPersonComponent, MockDateOfBirthComponent, DefendantDetailsPersonComponent],
      teardown: { destroyAfterEach: false }
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
    `,
    imports: [DefendantDetailsPersonComponent]
  })
  class TestDefendantDetailsPersonComponent {
    personDetails: PersonalDetails;
  }

  @Component({
    selector: 'date-of-birth',
    template: `
      <div>dateOfBirth: {{ dateOfBirth }}</div>
      <div>defaultSubstitute: {{ defaultSubstitute }}</div>
    `,
    imports: [DateOfBirthComponent]
  })
  class MockDateOfBirthComponent {
    @Input() dateOfBirth: string;
    @Input() defaultSubstitute = '–';
  }
});
