import { BasePage } from '../../base.page';
import { $, by, element } from 'protractor';

export class WithdrawOffencePage extends BasePage {
  public readonly pageHeaderBar = $('pdk-page-header');
  public readonly caseStatus = $(`[data-role='case-status']`);
  public readonly caseProsecutor = $(`[data-role='prosecutor']`);

  public readonly withdrawOffenceHeading = $(`[data-test='withdraw-offence-heading']`);
  public readonly withdrawOffenceRadioButtonYes = $(`input[type=radio][value='true']`);
  public readonly withdrawOffenceRadioButtonReasonInsufficient = element(by.cssContainingText('label', 'Other'));
  public readonly withdrawOffenceSubmitButton = element(by.cssContainingText('button', 'Confirm'));

  constructor(role: string, caseId: string) {
    super(`/${role}/case-overview/${caseId}/withdraw-offence`);
  }
}
