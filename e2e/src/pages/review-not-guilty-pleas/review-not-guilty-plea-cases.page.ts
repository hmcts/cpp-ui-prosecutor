import { BasePage } from '../base.page';
import { $, $$, by, element, protractor } from 'protractor';

export class ReviewNotGuiltyPleaCasesPage extends BasePage {
  public readonly subHeading = $('review-not-guilty-pleas-container span h2');

  public getNthCasePendingDatesToAvoid = (n: number) => {
    const lastRowIndex = n - 1;
    const rows = $$(`table tbody tr`);
    const lastRowCells = rows.get(lastRowIndex).all(by.css('td'));

    return {
      name: lastRowCells.get(0).getText(),
      address: lastRowCells.get(1).getText(),
      referenceNumber: lastRowCells.get(2).getText(),
      dateOfBirth: lastRowCells.get(4).getText(),
      pleaEntry: lastRowCells.get(5).getText()
    };
  };

  public getLinkElementWithTheMatchingText = (linkText: string) => {
    return element(by.partialLinkText(linkText));
  };

  public isPleaLinkClickable = (caseId: string) => {
    return protractor.ExpectedConditions.elementToBeClickable(this.getLinkElementWithTheMatchingText(caseId));
  };

  constructor(role: string) {
    super(`${role}/review-not-guilty-pleas`);
  }
}
