import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DefendantDetailsUpdatesComponent } from '../defendant-details-updates.component';
import { MOCK_DEFENDANT_DETAILS_UPDATES } from '../../dashboard/__tests__/test-mock-data';
import { Component, Input } from '@angular/core';
import { AcknowledgeDefendantDetailsUpdatesParam } from '../../contexts/sjp';
import { WhatChangedComponent } from '../what-changed/what-changed.component';
import { ActivatedRoute } from '@angular/router';
import { provideRouter } from '@angular/router';
import { JsonPipe } from '@angular/common';

let component: DefendantDetailsUpdatesComponent;
let fixture: ComponentFixture<DefendantDetailsUpdatesComponent>;

describe('DefendantDetailsUpdatesComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [provideRouter([]), { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '123' } } } }],
        teardown: { destroyAfterEach: false }
      })
        .overrideComponent(DefendantDetailsUpdatesComponent, {
          remove: {
            imports: [WhatChangedComponent]
          },
          add: {
            imports: [MockWhatChangedComponent]
          }
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(DefendantDetailsUpdatesComponent);
          component = fixture.componentInstance;
        });
    })
  );

  describe('when the component is loaded with less than 50 updates', () => {
    beforeEach(() => {
      component.defendantDetailsUpdates = MOCK_DEFENDANT_DETAILS_UPDATES;
    });

    it('should display defendant details updates with no limit message', () => {
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });
  });

  describe('when the component is loaded with more than 50 updates', () => {
    beforeEach(() => {
      component.defendantDetailsUpdates = {
        total: 51,
        defendantDetailsUpdates: MOCK_DEFENDANT_DETAILS_UPDATES.defendantDetailsUpdates
      };
    });

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

      jest.spyOn(component.acknowledgeDefendantDetailsUpdatesEmitter, 'emit');

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
  `,
  imports: [JsonPipe]
})
class MockWhatChangedComponent {
  @Input() defendantDetailsUpdate;
  @Input() region;
}
