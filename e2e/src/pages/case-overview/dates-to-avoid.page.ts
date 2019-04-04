import { $ } from 'protractor';
import { BasePage } from '../base.page';

export class DatesToAvoidPage extends BasePage {
  public readonly pageHeaderBar = $('pdk-page-header');

  public readonly datesToAvoidInputTextArea = $(`dates-to-avoid-page dates-to-avoid-form textarea`);
  public readonly datesToAvoidSubmit = $(`dates-to-avoid-page dates-to-avoid-form button[type=submit]`);
  public readonly datesToAvoidContinue = $(`dates-to-avoid-page button[type=button]`);

  constructor(role: string, caseId: string) {
    super(`/${role}/case-overview/${caseId}/dates-to-avoid`);
  }
}
