import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { reducers, State } from '../../reducers';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadDefendantDetailsUpdates } from '../../core/actions/entities';
import { MOCK_DEFENDANT_DETAILS_UPDATES } from '../../dashboard/__tests__/test-mock-data';
import { DefendantDetailsUpdatesContainer } from '../defendant-details-updates.container';

describe('DefendantDetailsUpdatesContainer', () => {
  let fixture: ComponentFixture<DefendantDetailsUpdatesContainer>;
  let store: Store<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefendantDetailsUpdatesContainer, MockDefendantDetailsUpdatesComponent],
      imports: [CommonModule, StoreModule.forRoot(reducers)],
      providers: []
    });

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(DefendantDetailsUpdatesContainer);
  });

  it('should create container', () => {
    store.dispatch(new LoadDefendantDetailsUpdates(MOCK_DEFENDANT_DETAILS_UPDATES));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'defendant-details-updates',
  template: `
    <span>{{ defendantDetailsUpdates | json }}</span>
  `
})
class MockDefendantDetailsUpdatesComponent {
  @Input() defendantDetailsUpdates;
}
