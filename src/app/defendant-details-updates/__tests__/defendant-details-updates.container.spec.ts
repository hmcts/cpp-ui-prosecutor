import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Component, Input } from '@angular/core';
import { LoadDefendantDetailsUpdates } from '../../core';
import { MOCK_DEFENDANT_DETAILS_UPDATES } from '../../dashboard/__tests__/test-mock-data';
import { DefendantDetailsUpdatesContainer } from '../defendant-details-updates.container';
import { AcknowledgeDefendantDetailsUpdates } from '../defendant-details-updates.action';
import { AcknowledgeDefendantDetailsUpdatesParam } from '../../contexts/sjp';
import { JsonPipe } from '@angular/common';
import { DefendantDetailsUpdatesComponent } from '../defendant-details-updates.component';
import { ActivatedRoute } from '@angular/router';

describe('DefendantDetailsUpdatesContainer', () => {
  let fixture: ComponentFixture<DefendantDetailsUpdatesContainer>;
  let store: Store<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: '123'
              }
            }
          }
        },
        provideStore()
      ],
      teardown: { destroyAfterEach: false }
    }).overrideComponent(DefendantDetailsUpdatesContainer, {
      remove: {
        imports: [DefendantDetailsUpdatesComponent]
      },
      add: {
        imports: [MockDefendantDetailsUpdatesComponent]
      }
    });

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(DefendantDetailsUpdatesContainer);
  });

  it('should create container', () => {
    store.dispatch(new LoadDefendantDetailsUpdates(MOCK_DEFENDANT_DETAILS_UPDATES));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  describe('when defendant details updates are acknowledged', () => {
    it('should dispatch the acknowledge defendant details updates action', () => {
      spyOn(store, 'dispatch');

      const params = {
        caseId: 'caseid',
        defendantId: 'defendantid'
      } as AcknowledgeDefendantDetailsUpdatesParam;

      fixture = TestBed.createComponent(DefendantDetailsUpdatesContainer);

      fixture.componentInstance.acknowledgeDefendantDetailsUpdates(params);

      expect(store.dispatch).toHaveBeenCalledWith(new AcknowledgeDefendantDetailsUpdates(params));
    });
  });

  describe('setRegion', () => {
    it('should dispatch SetFilter action and navigate to the selected region', () => {
      const payload = {
        selectedRegion: 'London',
        prosecutor: 'TFL'
      };

      spyOn(store, 'dispatch');
      const routerSpy = spyOn(fixture.componentInstance['router'], 'navigate');

      fixture.componentInstance.setFilter(payload);

      expect(store.dispatch).toHaveBeenCalledWith(expect.any(Object));
      expect(routerSpy).toHaveBeenCalledWith(['user', 'defendant-details-updates', 'London', 'TFL']);
    });
  });

  describe('viewCase', () => {
    it('should navigate to case overview with the correct caseId', () => {
      const caseId = 'test-case-id-123';
      const routerSpy = spyOn(fixture.componentInstance['router'], 'navigate');

      fixture.componentInstance.viewCase(caseId);

      expect(routerSpy).toHaveBeenCalledWith(['user', 'case-overview', caseId]);
    });
  });
});

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  selector: 'defendant-details-updates',
  template: `
    <span>{{ defendantDetailsUpdates | json }}</span>
    <span>{{ region | json }}</span>
    <span>{{ prosecutorOptions | json }}</span>
  `,
  imports: [JsonPipe]
})
class MockDefendantDetailsUpdatesComponent {
  @Input() defendantDetailsUpdates: any;
  @Input() region: any;
  @Input() prosecutorOptions: any;
}
