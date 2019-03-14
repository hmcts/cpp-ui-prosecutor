import { BasePage } from '../base.page';
import { $, $$, by, element } from 'protractor';

export class CaseOverviewPage extends BasePage {
  public readonly pageHeaderBar = $('pdk-page-header');
  public readonly caseStatus = $(`[data-role='case-status']`);
  public readonly caseProsecutor = $(`[data-role='prosecutor']`);
  public readonly offenceHeadings = $$(`defendant-offence h2`);
  public readonly offenceTitles = $$(`defendant-offence h3`);

  public readonly defendantName = $(`[data-role='defendant-name']`);
  public readonly defendantDob = $(`[data-role='date-of-birth']`);
  public readonly defendantEmail = $(`[data-role='defendant-email']`);

  public readonly downloadDocumentLink = $(`download-document a`);

  constructor(caseId) {
    super(`/case-overview/${caseId}`);
  }

  goToTab(linkName: string) {
    return element(by.linkText(linkName)).click();
  }
}
