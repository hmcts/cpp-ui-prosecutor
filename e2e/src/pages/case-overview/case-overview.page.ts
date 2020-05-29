import { BasePage } from '../base.page';
import { $, $$, by, element } from 'protractor';
import { compareClassNames } from '../../../../tools/utils';

export class CaseOverviewPage extends BasePage {
  public readonly pageHeaderBar = $('pdk-page-header');
  public readonly alertRequestSent = $('pdk-alert');
  public readonly caseStatus = $(`[data-role='case-status']`);
  public readonly caseProsecutor = $(`[data-role='prosecutor']`);
  public readonly offenceHeadings = $$(`defendant-offence h2`);
  public readonly offenceTitles = $$(`defendant-offence h3`);

  public readonly defendantName = $(`[data-role='defendant-name']`);
  public readonly defendantDob = $(`[data-role='date-of-birth']`);
  public readonly defendantEmail = $(`[data-role='defendant-email']`);

  public readonly downloadDocumentLink = $(`download-document a`);

  // Financial impositions area
  public readonly totalCompensation = $(`[data-role='imposition-compensation-amount']`);
  public readonly totalExcisePenalty = $(`[data-role='imposition-excise-penalty-amount']`);
  public readonly totalFinancialPenalty = $(`[data-role='imposition-fine-amount']`);
  public readonly totalBackDuty = $(`[data-role='imposition-backduty-amount']`);
  public readonly totalVictimSurcharge = $(`[data-role='imposition-surcharge-amount']`);
  public readonly totalCosts = $(`[data-role='imposition-costs-amount']`);

  // Offence decision
  public readonly offenceDecisionContainer = (offenceId: string) =>
    $(`[data-role='offence-decision-container-${offenceId}']`);
  public readonly fine = (offenceId: string) => $(`[data-role='offence-decision-container-${offenceId}']`).
    $(`[data-role='fine']`);
  public readonly excisePenalty = (offenceId: string) => this.offenceDecisionContainer(offenceId).
    $(`[data-role='excise-penalty']`);
  public readonly compensation = (offenceId: string) => this.offenceDecisionContainer(offenceId).
    $(`[data-role='compensation']`);
  public readonly backDuty = (offenceId: string) => this.offenceDecisionContainer(offenceId).
    $(`[data-role='back-duty']`);
  public readonly dischargeType = (offenceId: string) => this.offenceDecisionContainer(offenceId).
    $(`[data-role='discharge-type']`);

  constructor(role: string, caseId: string) {
    super(`/${role}/case-overview/${caseId}`);
  }

  goToTab(linkName: string) {
    return element(by.linkText(linkName)).click();
  }

  async toggleFirstOffenceFoldableTextState() {
    await $$(`defendant-offence pdk-foldable-text`)
      .first()
      .$('a')
      .click();
  }

  async isFirstOffenceTextFolded() {
    return (
      compareClassNames(
        await $$(`defendant-offence pdk-foldable-text`)
          .first()
          .$$('div')
          .first()
          .getAttribute('class'),
        'pdk-foldable--overflowed pdk-foldable'
      ) &&
      (await $$(`defendant-offence pdk-foldable-text`)
        .first()
        .$('a')
        .getText()) === 'More'
    );
  }

  async isFirstOffenceTextUnfolded() {
    return (
      compareClassNames(
        await $$(`defendant-offence pdk-foldable-text`)
          .first()
          .$$('div')
          .first()
          .getAttribute('class'),
        'pdk-foldable pdk-foldable--overflowed pdk-foldable--expanded'
      ) &&
      (await $$(`defendant-offence pdk-foldable-text`)
        .first()
        .$('a')
        .getText()) === 'Less'
    );
  }
}
