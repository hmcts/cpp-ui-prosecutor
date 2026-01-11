import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MOCK_CASE } from '../../../__tests__/test-mock-data';
import { CaseSubmissionMessagesComponent } from '../case-submission-messages.component';

describe('CaseSubmissionMessagesComponent', () => {
  let fixture: ComponentFixture<CaseSubmissionMessagesComponent>;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CaseSubmissionMessagesComponent],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(CaseSubmissionMessagesComponent);
    component = fixture.componentInstance;
    component.kase = MOCK_CASE;
  });

  it('should compile correctly', () => {
    component.kase.assigned = true;
    component.displayDatesToAvoidUpdateFailedBanner = false;
    component.displayOffencesWithdrawnBanner = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display banner if withdraw offences is successful', () => {
    component.kase.completed = false;
    component.kase.assigned = false;
    component.displayDatesToAvoidUpdateFailedBanner = false;
    component.displayOffencesWithdrawnBanner = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();

    const messagesElement: HTMLElement = fixture.nativeElement;
    const alertElement = messagesElement.querySelector('div.pdk-alert__message');
    expect(alertElement.textContent).toContain('Your request has been sent');
  });

  it('should display alert when case is completed', () => {
    component.kase.completed = true;
    component.kase.assigned = false;
    component.displayDatesToAvoidUpdateFailedBanner = false;
    component.displayOffencesWithdrawnBanner = false;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();

    const messagesElement: HTMLElement = fixture.nativeElement;
    const alertElement = messagesElement.querySelector('div.pdk-alert__message');
    expect(alertElement.textContent).toContain(`You can't edit this case because it has already been completed.`);
  });

  it('should display alert when case is assigned', () => {
    component.kase.completed = false;
    component.kase.assigned = true;
    component.displayDatesToAvoidUpdateFailedBanner = false;
    component.displayOffencesWithdrawnBanner = false;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();

    const messagesElement: HTMLElement = fixture.nativeElement;
    const alertElement = messagesElement.querySelector('div.pdk-alert__message');
    expect(alertElement.textContent).toContain(`This case is view–only, as a legal adviser is working on it.`);
  });

  it('should display correct banner if case is assigned and submit dates to avoid failed', () => {
    component.kase.completed = false;
    component.kase.assigned = true;
    component.displayDatesToAvoidUpdateFailedBanner = true;
    component.displayOffencesWithdrawnBanner = false;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();

    const messagesElement: HTMLElement = fixture.nativeElement;
    const alertElement = messagesElement.querySelector('div.pdk-alert__message');
    expect(alertElement.textContent).toContain(
      `The case has been assigned to a session and dates to avoid can't be added.`
    );
  });
});
