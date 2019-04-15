import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DefendantDetailsUpdatesComponent} from '../defendant-details-updates.component';
import {DefendantNamePipeModule} from '../../shared/pipes';
import {RouterTestingModule} from '@angular/router/testing';
import {MOCK_DEFENDANT_DETAILS_UPDATES} from '../../dashboard/__tests__/test-mock-data';
import {PdkButtonModule, PdkInsetTextModule} from '@cpp/pdk';
import {Component, Input} from '@angular/core';

let component: DefendantDetailsUpdatesComponent;
let fixture: ComponentFixture<DefendantDetailsUpdatesComponent>;

describe('DefendantDetailsUpdatesComponent', () => {
  let navigate: jest.Mock;

  beforeEach(async(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      declarations: [DefendantDetailsUpdatesComponent, MockWhatChangedComponent],
      imports: [RouterTestingModule, PdkButtonModule, PdkInsetTextModule, DefendantNamePipeModule]
    });

    fixture = TestBed.createComponent(DefendantDetailsUpdatesComponent);
    component = fixture.componentInstance;
  }));

  describe('when the component is loaded with less than 50 updates', () => {
    beforeEach(async(() => {
      component.defendantDetailsUpdates = MOCK_DEFENDANT_DETAILS_UPDATES;
    }));

    it('should display defendant details updates with no limit message', () => {
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });
  });

  describe('when the component is loaded with more than 50 updates', () => {
    beforeEach(async(() => {
      component.defendantDetailsUpdates = {
        total: 51,
        defendantDetailsUpdates: MOCK_DEFENDANT_DETAILS_UPDATES.defendantDetailsUpdates
      };
    }));

    it('should display defendant details updates with limit message', () => {
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });
  });
});

@Component({
  selector: 'what-changed',
  template: `
    <span>{{ defendantDetailsUpdate | json }}</span>
  `
})
class MockWhatChangedComponent {
  @Input() defendantDetailsUpdate;
}
