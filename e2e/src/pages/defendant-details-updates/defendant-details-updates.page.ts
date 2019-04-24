import {BasePage} from '../base.page';
import {$, $$, by, element} from 'protractor';
import {isStable} from '../../util';

export class DefendantDetailsUpdatesPage extends BasePage {

  public readonly subHeading = $('h1');

  constructor(role: string) {
    super(`${role}/defendant-details-updates`);
  }

  async navigateToDashboardPageUsingBreadcrumb() {
    await element(by.linkText('Home')).click();
    await isStable();
  }

  async navigateToDashboardUsingBackButton() {
    await $('#back-button').click();
    await isStable();
  }

  async updatesCount() {
    return $('#updates-count').getText();
  }

  getDefendantDetailsUpdatesTableRow = (index) => {
    const row = $$(`#cases tr`).get(index);
    return {
      defendantName: row.element(by.css(`[data-role='defendant-name']`)).getText(),
      urn: row.element(by.css(`[data-role='urn']`)).getText(),
      dateOfBirth: row.element(by.css(`[data-role='date-of-birth']`)).getText(),
      updatedOn: row.element(by.css(`[data-role='updated-on']`)).getText(),
      dateOfBirthUpdated: row.element(by.css(`[data-role='date-of-birth-updated']`)).isPresent(),
      addressUpdated: row.element(by.css(`[data-role='address-updated']`)).isPresent(),
      nameUpdated: row.element(by.css(`[data-role='name-updated']`)).isPresent()
    };
  };

  async pageTitle() {
    return this.subHeading.getText();
  }

  async clickRemoveFirstUpdate() {
    await $$(`#cases tr`).get(1).element(by.css(`[data-role='remove-link']`)).click();
    await isStable();
  }
}
