import { BasePage } from '../base.page';
import { $ } from 'protractor';

export class CasesMissingSjpNoticePage extends BasePage {
  public readonly casesNumberParagraph = $(`[data-test='cases-number']`);
  public readonly casesTable = $('table');

  constructor() {
    super('/tfl/cases-missing-sjp-notices');
  }
}
