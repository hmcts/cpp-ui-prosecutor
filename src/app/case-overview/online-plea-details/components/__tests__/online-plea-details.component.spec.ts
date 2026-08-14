import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnlinePleaDetailsComponent } from '../online-plea-details.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { transformOnlinePleaToUiModel } from '../../online-plea-utils';
import {
  MOCK_CASE,
  MOCK_CASE_LEGAL_ENTITY_DEFENDANT,
  MOCK_OFFENCES,
  MOCK_ONLINE_PLEA_DETAIL
} from './../../../__tests__/test-mock-data';
import { Case } from './../../../../contexts/sjp';
import { reducers } from '../../../../core/reducers';
import { provideStore } from '@ngrx/store';
import { CaseHeaderBadgeContainer } from '../../../common/case-header-badge/case-header-badge.container';

describe('OnlinePleaComponent', () => {
  let fixture: ComponentFixture<OnlinePleaDetailsComponent>;
  const mockOnlinePleas = transformOnlinePleaToUiModel(MOCK_ONLINE_PLEA_DETAIL.pleas);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore(reducers, { runtimeChecks: {} })],
      teardown: { destroyAfterEach: false }
    }).overrideComponent(OnlinePleaDetailsComponent, {
      remove: {
        imports: [CaseHeaderBadgeContainer]
      },
      add: {
        imports: [MockCaseHeaderBadgeContainer]
      }
    });
    fixture = TestBed.createComponent(OnlinePleaDetailsComponent);
  });

  it('should display online plea', () => {
    fixture.componentInstance.onlinePleas = mockOnlinePleas;
    fixture.componentInstance.kase = {
      ...MOCK_CASE,
      offences: MOCK_OFFENCES[0]
    } as Case;

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should correctly display two offences', () => {
    fixture.componentInstance.onlinePleas = mockOnlinePleas;
    fixture.componentInstance.kase = MOCK_CASE;
    fixture.detectChanges();
    expect(
      fixture.debugElement
        .queryAll(By.css('h2'))
        .filter(elem => (elem.nativeElement.innerHTML as string).includes('Plea for offence')).length
    ).toBe(2);
  });

  it('should display financial information', () => {
    fixture.componentInstance.onlinePleas = mockOnlinePleas;
    fixture.componentInstance.kase = MOCK_CASE;

    fixture.detectChanges();
    expect(
      fixture.debugElement
        .queryAll(By.css('h2'))
        .filter(elem => (elem.nativeElement.innerHTML as string).includes('Finances')).length
    ).toBe(1);
  });

  it('should compile correctly with legal entity defendant', () => {
    fixture.componentInstance.onlinePleas = mockOnlinePleas;
    fixture.componentInstance.kase = MOCK_CASE_LEGAL_ENTITY_DEFENDANT;

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
  @Component({
    selector: 'case-header-badge-container',
    template: `
      <pre>case badge</pre>
    `
  })
  class MockCaseHeaderBadgeContainer {}
});
