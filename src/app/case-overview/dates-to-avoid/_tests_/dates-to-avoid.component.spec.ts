import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MOCK_CASE } from '../../__tests__/test-mock-data';
import { DatesToAvoidComponent } from '../dates-to-avoid.component';
import { CaseHeaderBadgeContainer } from '../../common/case-header-badge/case-header-badge.container';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';

@Component({
  selector: 'case-header-badge-container',
  template: `
    <pre>case badge</pre>
  `
})
class MockCaseHeaderBadgeContainer {}

describe('DatesToAvoidComponent', () => {
  let fixture: ComponentFixture<DatesToAvoidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideStore(), provideRouter([])],
      teardown: { destroyAfterEach: false }
    })
      .overrideComponent(DatesToAvoidComponent, {
        remove: {
          imports: [CaseHeaderBadgeContainer]
        },
        add: {
          imports: [MockCaseHeaderBadgeContainer]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(DatesToAvoidComponent);
    fixture.componentInstance.kase = { id: 'case-id' } as any;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display the dates to avoid component', () => {
    fixture.componentInstance.displayDatesToAvoidBanner = false;
    fixture.componentInstance.kase = MOCK_CASE;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display confirmation banner', () => {
    fixture.componentInstance.displayDatesToAvoidBanner = true;
    fixture.componentInstance.kase = MOCK_CASE;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
