import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { caseOverviewReducer } from '../../case-overview.reducer';
import { reducers } from '../../../core/reducers';
import { DatesToAvoidContainer } from '../dates-to-avoid.container';
import { Case } from '../../../contexts/sjp';
import { SubmitDatesToAvoid } from '../../case-overview.action';
import { By } from '@angular/platform-browser';

describe('DatesToAvoidContainer', () => {
  let fixture: ComponentFixture<DatesToAvoidContainer>;
  let navigate: jest.Mock;
  let store: Store<any>;
  let mockChildComponent: MockDatesToAvoidComponent;

  beforeEach(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      declarations: [DatesToAvoidContainer, MockDatesToAvoidComponent],
      imports: [
        StoreModule.forRoot(reducers, { runtimeChecks: {} }),
        StoreModule.forFeature('kase', caseOverviewReducer)
      ],
      providers: [
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
    });
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(DatesToAvoidContainer);
    mockChildComponent = fixture.debugElement.query(By.directive(MockDatesToAvoidComponent)).componentInstance;
    spyOn(store, 'dispatch');
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
    `
  })
  class MockDatesToAvoidComponent {
    @Input() kase: Case;
    @Input() displayDatesToAvoidBanner: boolean;
    @Output() formSubmit = new EventEmitter<string>();
  }
});
