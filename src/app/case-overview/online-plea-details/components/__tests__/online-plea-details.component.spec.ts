import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkGridModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { Component, PipeTransform, Pipe } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { OnlinePleaDetailsComponent } from '../online-plea-details.component';
import {
  FormatAddressPipeModule,
  FirstLastNamePipeModule,
  YesNoPipeModule,
  IfEmptyPipeModule,
  PleaStatusPipeModule
} from '../../../../shared/pipes';
import { OnlinePleaUi } from '../../online-plea-interface';
import { Case } from '../../../../contexts/sjp';
import { MockModule } from '../../../../shared/mock-components/mock.module';
import { MOCK_CASE, MOCK_ONLINE_PLEA_DETAIL } from '../../../__tests__/test-mock-data';
import { SjpCurrencyPipeModule } from '../../../../shared/pipes/sjp-currency/sjp-currency.module';
import { FeatureState } from '../../../case-overview.selectors';
import { DateOfBirthModule } from '../../../../shared/date-of-birth/date-of-birth.module';
import { OnlinePleaDetailsContainer } from '../../online-plea-details.container';
import { reducers } from '../../../../reducers';

describe('OnlinePleaComponent', () => {
  let fixture: ComponentFixture<MockDefendantOnlinePleaDetailsContainer>;
  let store: Store<FeatureState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlinePleaDetailsComponent, MockDefendantOnlinePleaDetailsContainer, MockFormatDatePipe, MockCaseHeaderBadgeContainer],
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
        MockModule,
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
      <online-plea-details [kase]="kase" [onlinePlea]="onlinePlea"></online-plea-details>
    `
  })
  class MockDefendantOnlinePleaDetailsContainer {
    onlinePlea: OnlinePleaUi;
    kase: Case = MOCK_CASE;
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

@Component({
  selector: 'case-header-badge-container',
  template: `
    mock case header
  `
})
class MockCaseHeaderBadgeContainer {  }
