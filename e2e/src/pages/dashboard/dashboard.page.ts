import {BasePage} from '../base.page';
import {$} from 'protractor';
import {isStable} from '../../util';

export class DashboardPage extends BasePage {
  public readonly subHeading = $('h1 span');
  public readonly reviewNotGuiltyPleasLink = $('review-not-guilty-pleas-link');

  constructor() {
    super(`/tvl`);
  }

  async searchForUrn(urn: string) {
    await $('pdk-searchbar input[type=text]').sendKeys(urn);
    await $('button[type=submit]').click();
    await isStable();
  }

  async clickDefendantDetailsUpdatesLink() {
    await $('#defendant-details-updates-link').click();
    await isStable();
  }
}
