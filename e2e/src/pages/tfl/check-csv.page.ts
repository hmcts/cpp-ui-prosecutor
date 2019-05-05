import { BasePage } from '../base.page';
import { $, $$, by } from 'protractor';

export class CheckCsvPage extends BasePage {
  public readonly heading = $('h1');
  public readonly tableRows = $$('table tr');

  constructor() {
    super(`/tfl/check-csv-uploads`);
  }

  getRow(index: number) {
    const row = this.tableRows.get(index);
    return {
      fileName: row.element(by.css(`td[data-col='file-name']`)),
      status: row.element(by.css(`td[data-col='csv-upload-status']`)),
      viewReport: row.element(by.linkText(`View report`))
    };
  }
}
