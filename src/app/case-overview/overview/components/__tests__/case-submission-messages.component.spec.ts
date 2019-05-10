import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MOCK_CASE } from '../../../__tests__/test-mock-data';

import { CaseSubmissionMessagesComponent } from '../case-submission-messages.component';
import { PdkAlertModule, PdkCoreModule, PdkWarningTextModule } from '@cpp/pdk';

describe('CaseSubmissionMessagesComponent', () => {
  let fixture: ComponentFixture<CaseSubmissionMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseSubmissionMessagesComponent],
      imports: [PdkCoreModule, PdkWarningTextModule, PdkAlertModule]
    });

    fixture = TestBed.createComponent(CaseSubmissionMessagesComponent);
  });

  it('should compile correctly', () => {
    fixture.componentInstance.kase = MOCK_CASE;
    fixture.componentInstance.kase.assigned = true;
    fixture.componentInstance.displayDatesToAvoidUpdateFailedBanner = false;
    fixture.componentInstance.displayOffencesWithdrawnBanner = true;
    fixture.componentInstance.displayOffencesWithdrawnFailedBanner = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
