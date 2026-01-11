import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { provideStore, Store } from '@ngrx/store';
import { reducers } from '../../../core/reducers';
import { DatesToAvoidContainer } from '../dates-to-avoid.container';
import { DatesToAvoidComponent } from '../dates-to-avoid.component';
import { Case } from '../../../contexts/sjp';
import { SubmitDatesToAvoid } from '../../case-overview.action';
import { By } from '@angular/platform-browser';
import { MOCK_CASE } from '../../__tests__/test-mock-data';
import { LoadCaseSuccess } from '../../../core/actions';

describe('DatesToAvoidContainer', () => {
  let fixture: ComponentFixture<DatesToAvoidContainer>;
  let navigate: jest.Mock;
  let store: Store<any>;
  let mockChildComponent: MockDatesToAvoidComponent;

  beforeEach(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        {
          provide: Router,
          useValue: {
            navigate
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ],
      teardown: { destroyAfterEach: false }
    }).overrideComponent(DatesToAvoidContainer, {
      remove: {
        imports: [DatesToAvoidComponent]
      },
      add: {
        imports: [MockDatesToAvoidComponent]
      }
    });
    store = TestBed.inject(Store);
    store.dispatch(new LoadCaseSuccess(MOCK_CASE));
    fixture = TestBed.createComponent(DatesToAvoidContainer);
    fixture.detectChanges();
    mockChildComponent = fixture.debugElement.query(By.directive(MockDatesToAvoidComponent)).componentInstance;
    jest.spyOn(store, 'dispatch');
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch dates to avoid correctly', () => {
    fixture.detectChanges();
    mockChildComponent.formSubmit.emit('dates To Avoid value1');
    expect(store.dispatch).toHaveBeenCalledWith(new SubmitDatesToAvoid('dates To Avoid value1'));
  });

  @Component({
    selector: 'dates-to-avoid-page',
    template: `
      <pre>{{ kase | json }}</pre>
    `,
    imports: [JsonPipe]
  })
  class MockDatesToAvoidComponent {
    @Input() kase: Case;
    @Input() displayDatesToAvoidBanner: boolean;
    @Output() formSubmit = new EventEmitter<string>();
  }
});
