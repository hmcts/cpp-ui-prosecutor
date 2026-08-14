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

      component.acknowledgeDefendantDetailsUpdate(CASE_ID, DEFENDANT_ID);

      expect(component.acknowledgeDefendantDetailsUpdatesEmitter.emit).toHaveBeenCalledWith(params);
    });
  });

  describe('prosecutor filter', () => {
    it('should not display prosecutor filter when there are less than minNumberOfProsecutor options', () => {
      component.defendantDetailsUpdates = MOCK_DEFENDANT_DETAILS_UPDATES;
      component.prosecutorOptions = [{ label: 'All', value: 'All' }];
      fixture.detectChanges();

      const prosecutorSelect = fixture.nativeElement.querySelector('pdk-select[name="prosecutor"]');
      expect(prosecutorSelect).toBeNull();
    });

    it('should display prosecutor filter when there are minNumberOfProsecutor or more options', () => {
      component.defendantDetailsUpdates = MOCK_DEFENDANT_DETAILS_UPDATES;
      component.prosecutorOptions = [
        { label: 'All', value: 'All' },
        { label: 'TFL', value: 'TFL' },
        { label: 'TVL', value: 'TVL' }
      ];
      fixture.detectChanges();

      const prosecutorSelect = fixture.nativeElement.querySelector('pdk-select[name="prosecutor"]');
      expect(prosecutorSelect).not.toBeNull();
    });

    it('should display prosecutor filter with exactly 2 options (minNumberOfProsecutor)', () => {
      component.defendantDetailsUpdates = MOCK_DEFENDANT_DETAILS_UPDATES;
      component.prosecutorOptions = [
        { label: 'All', value: 'All' },
        { label: 'TFL', value: 'TFL' }
      ];
      fixture.detectChanges();

      const prosecutorSelect = fixture.nativeElement.querySelector('pdk-select[name="prosecutor"]');
      expect(prosecutorSelect).toBeNull();
    });

    it('should display prosecutor filter with 3 options (more than minNumberOfProsecutor)', () => {
      component.defendantDetailsUpdates = MOCK_DEFENDANT_DETAILS_UPDATES;
      component.prosecutorOptions = [
        { label: 'All', value: 'All' },
        { label: 'TFL', value: 'TFL' },
        { label: 'TVL', value: 'TVL' }
      ];
      fixture.detectChanges();

      const prosecutorSelect = fixture.nativeElement.querySelector('pdk-select[name="prosecutor"]');
      expect(prosecutorSelect).not.toBeNull();
    });
  });

  describe('setFilter event', () => {
    it('should emit setFilter when form is submitted', () => {
      component.defendantDetailsUpdates = MOCK_DEFENDANT_DETAILS_UPDATES;
      component.region = {
        selectedRegion: 'London',
        regions: [
          { label: 'All', value: 'All' },
          { label: 'London', value: 'London' }
        ],
        prosecutor: 'All'
      };
      component.prosecutorOptions = [
        { label: 'All', value: 'All' },
        { label: 'TFL', value: 'TFL' },
        { label: 'TVL', value: 'TVL' }
      ];
      fixture.detectChanges();

      jest.spyOn(component.setFilter, 'emit');

      const form = fixture.nativeElement.querySelector('form[pdk-form]');
      form.dispatchEvent(new Event('submit'));
      fixture.detectChanges();

      expect(component.setFilter.emit).toHaveBeenCalled();
    });
  });

  describe('empty state', () => {
    it('should display warning message when there are no defendant details updates', () => {
      component.defendantDetailsUpdates = {
        total: 0,
        defendantDetailsUpdates: []
      };
      fixture.detectChanges();

      const warningText = fixture.nativeElement.querySelector('pdk-warning-text');
      expect(warningText).not.toBeNull();
      expect(warningText.textContent).toContain('There are no cases with defendant detail updates');
    });

    it('should not display table when there are no defendant details updates', () => {
      component.defendantDetailsUpdates = {
        total: 0,
        defendantDetailsUpdates: []
      };
      fixture.detectChanges();

      const table = fixture.nativeElement.querySelector('table[pdk-table]');
      expect(table).toBeNull();
    });
  });

  describe('viewCase event', () => {
    it('should emit viewCase when defendant name link is clicked', () => {
      component.defendantDetailsUpdates = MOCK_DEFENDANT_DETAILS_UPDATES;
      fixture.detectChanges();

      jest.spyOn(component.viewCase, 'emit');

      const defendantLink = fixture.nativeElement.querySelector('[data-role="defendant-name"] a');
      defendantLink.click();

      expect(component.viewCase.emit).toHaveBeenCalledWith(
        MOCK_DEFENDANT_DETAILS_UPDATES.defendantDetailsUpdates[0].caseId
      );
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
  @Input() defendantDetailsUpdate: any;
  @Input() region: any;
}
