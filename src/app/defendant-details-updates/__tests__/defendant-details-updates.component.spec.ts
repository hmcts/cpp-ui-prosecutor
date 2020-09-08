import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefendantDetailsUpdatesComponent } from '../defendant-details-updates.component';
import { DefendantNamePipeModule } from '../../shared/pipes';
import { RouterTestingModule } from '@angular/router/testing';
import { MOCK_DEFENDANT_DETAILS_UPDATES } from '../../dashboard/__tests__/test-mock-data';
import {
  PdkButtonModule,
  PdkInsetTextModule,
  PdkGridModule,
  PdkSelectModule,
  PdkFormModule,
  PdkWarningTextModule,
  PdkDividerModule
} from '@cpp/pdk';
import { Component, Input } from '@angular/core';
import { AcknowledgeDefendantDetailsUpdatesParam } from '../../contexts/sjp';
import { MockModule } from '../../shared/mock-components/mock.module';

let component: DefendantDetailsUpdatesComponent;
let fixture: ComponentFixture<DefendantDetailsUpdatesComponent>;

describe('DefendantDetailsUpdatesComponent', () => {
  let navigate: jest.Mock;

  beforeEach(async(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      declarations: [DefendantDetailsUpdatesComponent, MockWhatChangedComponent],
      imports: [
        RouterTestingModule,
        PdkButtonModule,
        PdkGridModule,
        PdkSelectModule,
        PdkFormModule,
        PdkInsetTextModule,
        DefendantNamePipeModule,
        MockModule,
        PdkWarningTextModule,
        PdkDividerModule
      ]
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

  describe('when defendant details updates are acknowledged', () => {
    it('should emit the correct parameters', () => {
      const CASE_ID = 'case-id';
      const DEFENDANT_ID = 'defendant-id';

      const params = {
        caseId: CASE_ID,
        defendantId: DEFENDANT_ID
      } as AcknowledgeDefendantDetailsUpdatesParam;

      spyOn(component.acknowledgeDefendantDetailsUpdatesEmitter, 'emit');

      component.acknowledgeDefendendantDetailsUpdate(CASE_ID, DEFENDANT_ID);

      expect(component.acknowledgeDefendantDetailsUpdatesEmitter.emit).toHaveBeenCalledWith(params);
    });
  });
});

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  selector: 'what-changed',
  template: `
    <span>{{ defendantDetailsUpdate | json }}</span>
    <span>{{ region | json }}</span>
  `
})
class MockWhatChangedComponent {
  @Input() defendantDetailsUpdate;
  @Input() region;
}
