import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseCreateSuccessComponent } from '../manual-case-create-success.component';
import { ManualCase } from '../../../core/model/manual-case';
import { AgeMockPipe } from '../../../shared/pipes/mock-pipes/age-mock.pipe';
import { TranslateMockPipe } from '../../../shared/pipes/mock-pipes/translate-mock.pipe';
import { provideTranslateService } from '@ngx-translate/core';

describe('Manual case create success', () => {
  let fixture: ComponentFixture<CaseCreateSuccessComponent>;
  let component: CaseCreateSuccessComponent;

  const manualCaseDetailMock = {
    initiationCode: 'J', // SJP Case
    prosecutor: {}
  } as ManualCase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AgeMockPipe, TranslateMockPipe, CaseCreateSuccessComponent],
      providers: [
        provideTranslateService({
          lang: 'en',
          fallbackLang: 'en'
        })
      ]
    });

    fixture = TestBed.createComponent(CaseCreateSuccessComponent);
    component = fixture.componentInstance;
    component.caseDetails = manualCaseDetailMock;
  });

  it('should render the component', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should return type SJP if selected', () => {
    expect(component.isTypeSjp).toBeTruthy();
  });
});
