import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnlinePleaDetailsComponent } from '../online-plea-details.component';
import {
  FormatAddressPipeModule,
  FirstLastNamePipeModule,
  YesNoPipeModule,
  IfEmptyPipeModule,
  PleaStatusPipeModule
} from 'src/app/shared/pipes';
import { PdkGridModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { Component, PipeTransform, Pipe } from '@angular/core';

import { OnlinePleaDetailsContainer } from 'src/app/case-overview/online-plea-details/online-plea-details.container';
import { DateOfBirthModule } from 'src/app/shared/date-of-birth/date-of-birth.module';
import { StoreModule, Store } from '@ngrx/store';
import { reducers } from 'src/app/reducers';
import { FeatureState } from 'src/app/case-overview/case-overview.selectors';
import { SjpCurrencyPipeModule } from 'src/app/shared/pipes/sjp-currency/sjp-currency.module';
import { OnlinePleaUi } from '../../online-plea-interface';
import { MOCK_ONLINE_PLEA_DETAIL } from 'src/app/case-overview/__tests__/test-mock-data';
import { By } from '@angular/platform-browser';

describe('OnlinePleaComponent', () => {
  let fixture: ComponentFixture<OnlinePleaDetailsComponent>;
  let store: Store<FeatureState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlinePleaDetailsComponent, MockDefendantOnlinePleaDetailsContainer, MockFormatDatePipe],
      imports: [
        CommonModule,
        PdkGridModule,
        FirstLastNamePipeModule,
        FormatAddressPipeModule,
        YesNoPipeModule,
        IfEmptyPipeModule,
        SjpCurrencyPipeModule,
        DateOfBirthModule,
        PleaStatusPipeModule,
        StoreModule.forRoot(reducers)
      ]
    });
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(MockDefendantOnlinePleaDetailsContainer);
  });

  it('should display online plea', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should correctly display two offences', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('h3'))
      .filter(elem => (elem.nativeElement.innerHTML as string).includes('Plea for offence')).length).toBe(2);
  });

  @Component({
    selector: 'online-plea-container',
    template: `
      <online-plea-details [onlinePlea]="onlinePlea"></online-plea-details>
    `
  })
  class MockDefendantOnlinePleaDetailsContainer {
    onlinePlea: OnlinePleaUi;
    constructor() {
      const container = new OnlinePleaDetailsContainer(store);
      this.onlinePlea = container.transformToUiModel(MOCK_ONLINE_PLEA_DETAIL);
    }
  }

  @Pipe({
    name: 'formatDate'
  })
  class MockFormatDatePipe implements PipeTransform {
    transform(value: any) {
      return value;
    }
  }
});
