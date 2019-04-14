import { BasePage } from '../base.page';
import { $$, by, element } from 'protractor';

export class ExportCaseDecisionsPage extends BasePage {
  public readonly fromDay = $$(`input[type='number'][name='dateDay']`).first();
  public readonly toDay = $$(`input[type='number'][name='dateDay']`).last();

  public readonly fromMonth = $$(`input[type='number'][name='dateMonth']`).first();
  public readonly toMonth = $$(`input[type='number'][name='dateMonth']`).last();

  public readonly fromYear = $$(`input[type='number'][name='dateYear']`).first();
  public readonly toYear = $$(`input[type='number'][name='dateYear']`).last();

  public readonly searchButton = element(by.cssContainingText('button', 'Search'));

  public getCaseResultsElement = () => {
    return $$(`p[pdk-typography="heading-medium"][class='govuk-heading-m']`).first();
  };

  public getCaseResultsErrorMessageElement = () => {
    return $$('pdk-error-message').first();
  };

  public getDownloadResultsLink = (fromDate: string, toDate: string) => {
    return $$(
      `a[class='govuk-button pdk-button--secondary'][href='/api/mireportdata-query-api/query/api/rest/mireportdata/case-export?fromDate='` +
        fromDate +
        `'&toDate='` +
        toDate +
        `']`
    ).first();
  };

  constructor(role: string) {
    super(`${role}/export-case-decisions`);
  }
}
