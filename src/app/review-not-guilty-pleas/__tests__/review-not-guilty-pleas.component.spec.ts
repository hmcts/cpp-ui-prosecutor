import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewNotGuiltyPleasComponent } from '../review-not-guilty-pleas.component';
import { DefendantNamePipeModule, FormatAddressPipeModule } from '../../shared/pipes';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MOCK_PENDING_DATES_TO_AVOID,
  MOCK_PENDING_DATES_TO_AVOID_WITH_SINGLE_CASE
} from '../../dashboard/__tests__/test-mock-data';
import { PdkButtonModule, PdkDividerModule, PdkWarningTextModule, PdkSelectModule, PdkGridModule, PdkFormModule } from '@cpp/pdk';
import { MockModule } from '../../shared/mock-components/mock.module';

describe('ReviewNotGuiltyPleasComponent', () => {
  let navigate: jest.Mock;
  let component: ReviewNotGuiltyPleasComponent;
  let fixture: ComponentFixture<ReviewNotGuiltyPleasComponent>;

  beforeEach(async(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      declarations: [ReviewNotGuiltyPleasComponent],
      imports: [
        FormatAddressPipeModule,
        RouterTestingModule,
        DefendantNamePipeModule,
        PdkDividerModule,
        PdkWarningTextModule,
        PdkButtonModule,
        MockModule,
        PdkSelectModule,
        PdkGridModule,
        PdkFormModule
      ]
    });

    fixture = TestBed.createComponent(ReviewNotGuiltyPleasComponent);
    component = fixture.componentInstance;
  }));

  it('when the component is created with zero cases then the component should display message "There are no cases to review"', () => {
    component.pleadedNotGuiltyCasesDetail = {
      cases: [],
      count: 0
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('when the component is created with 1 case then the component should be created with out failure', () => {
    component.pleadedNotGuiltyCasesDetail = MOCK_PENDING_DATES_TO_AVOID_WITH_SINGLE_CASE;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('then the component should be created with out failure', () => {
    component.pleadedNotGuiltyCasesDetail = MOCK_PENDING_DATES_TO_AVOID;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
