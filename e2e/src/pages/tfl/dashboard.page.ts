import { BasePage } from '../base.page';
import { $ } from 'protractor';

export class TflDashboardPage extends BasePage {
  public readonly csvUploadErrorLink = $(`a[title='CSV errors in last upload']`);

  constructor() {
    super(`/tfl`);
  }
}
