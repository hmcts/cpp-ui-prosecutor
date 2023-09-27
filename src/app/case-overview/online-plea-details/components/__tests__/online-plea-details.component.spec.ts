import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnlinePleaDetailsComponent } from '../online-plea-details.component';
import {
  FormatAddressPipeModule,
  DefendantNamePipeModule,
  YesNoPipeModule,
  IfEmptyPipeModule,
  PleaStatusPipeModule,
  AgePipeModule,
  EmploymentStatusModule,
  SjpCurrencyPipeModule
} from '../../../../shared/pipes';
import { PdkGridModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../../reducers';
import { By } from '@angular/platform-browser';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { DateOfBirthComponent } from './../../../../shared/date-of-birth/date-of-birth.component';
import { transformOnlinePleaToUiModel } from '../../online-plea-utils';
import { MOCK_CASE, MOCK_CASE_LEGAL_ENTITY_DEFENDANT, MOCK_OFFENCES, MOCK_ONLINE_PLEA_DETAIL } from './../../../__tests__/test-mock-data';
import { MockBreadcrumbLinksComponent } from './../../../../shared/mock-components/mock-breadcrumb-links.component';
import { Case } from './../../../../contexts/sjp';


describe('OnlinePleaComponent', () => {
  let fixture: ComponentFixture<OnlinePleaDetailsComponent>;
  const mockOnlinePleas = transformOnlinePleaToUiModel(MOCK_ONLINE_PLEA_DETAIL.pleas);
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DateOfBirthComponent,
        OnlinePleaDetailsComponent,
        MockFormatDatePipe,
        MockCaseHeaderBadgeContainer,
        MockBreadcrumbLinksComponent
      ],
      imports: [
        CommonModule,
        PdkGridModule,
        DefendantNamePipeModule,
        FormatAddressPipeModule,
        YesNoPipeModule,
        IfEmptyPipeModule,
        SjpCurrencyPipeModule,
        EmploymentStatusModule,
        PleaStatusPipeModule,
        AgePipeModule
      ]
    });
    fixture = TestBed.createComponent(OnlinePleaDetailsComponent);
  });

  it('should display online plea', () => {
    fixture.componentInstance.onlinePleas = mockOnlinePleas;
    fixture.componentInstance.kase = {
      ...MOCK_CASE,
      offences: MOCK_OFFENCES[0],
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

  @Pipe({
    name: 'formatDate'
  })
  class MockFormatDatePipe implements PipeTransform {
    transform(value: any) {
      return `formatted ${value}`;
    }
  }

  @Component({
    selector: 'case-header-badge-container',
    template: `
      <pre>case badge</pre>
    `
  })
  class MockCaseHeaderBadgeContainer {}
});

