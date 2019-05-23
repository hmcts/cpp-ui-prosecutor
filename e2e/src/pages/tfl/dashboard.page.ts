import { BasePage } from '../base.page';
import { $ } from 'protractor';

export class TflDashboardPage extends BasePage {
  public readonly csvUploadErrorLink = $(`a[title='CSV errors in last upload']`);
  public readonly casesMissingSjpNoticeLink = $(`a[title='Cases missing SJP notices']`);
  public readonly documentUploadErrorLink = $(`a[title = 'Document errors in last upload']`);

  constructor() {
    super(`/tfl`);
  }
}
