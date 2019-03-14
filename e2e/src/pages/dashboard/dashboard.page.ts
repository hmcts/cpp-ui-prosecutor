import { BasePage } from '../base.page';
import { $ } from 'protractor';
import { isStable } from '../../util';

export class DashboardPage extends BasePage {
  public readonly subHeading = $('h1 span');

  constructor() {
    super(`/`);
  }

  async searchForUrn(urn: string) {
    await $('pdk-searchbar input[type=text]').sendKeys(urn);
    await $('button[type=submit]').click();
    await isStable();
  }
}
