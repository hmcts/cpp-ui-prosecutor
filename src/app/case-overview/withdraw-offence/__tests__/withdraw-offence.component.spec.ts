import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { WithdrawOffenceComponent } from '../withdraw-offence.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { MOCK_CASE, MOCK_OFFENCES } from '../../__tests__/test-mock-data';
import { reducers } from '../../../core/reducers';
import { provideStore } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CaseHeaderBadgeContainer } from '../../common/case-header-badge/case-header-badge.container';

describe('WithdrawOffenceComponent', () => {
  let fixture: ComponentFixture<WithdrawOffenceComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          provideStore(reducers, { runtimeChecks: {} }),
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: { params: { id: '123' } },
              params: of({ id: '123' })
            }
          }
        ],
        schemas: [NO_ERRORS_SCHEMA],
        teardown: { destroyAfterEach: false }
      })
        .overrideComponent(WithdrawOffenceComponent, {
          remove: {
            imports: [CaseHeaderBadgeContainer]
          },
          add: {
            imports: [MockCaseHeaderBadgeContainer]
          }
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(WithdrawOffenceComponent);
          fixture.componentInstance.kase = MOCK_CASE;
          fixture.componentInstance.offences = MOCK_OFFENCES;
        });
    })
  );

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display the offence component', () => {
    fixture.componentInstance.offences = MOCK_OFFENCES;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'case-header-badge-container',
  template: `
    <pre>case badge</pre>
  `
})
class MockCaseHeaderBadgeContainer {}
