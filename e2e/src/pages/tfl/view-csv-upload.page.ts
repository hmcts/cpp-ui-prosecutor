import { BasePage } from '../base.page';
import { $, $$ } from 'protractor';

export class ViewCsvUploadPage extends BasePage {
  public readonly heading = $('h1');
  public readonly subHeading = $$('h3');

  public readonly fileName = $(`[data-role='file-name']`);
  public readonly errorStatus = $(`[data-role='csv-upload-status']`);

  constructor(uploadId: string) {
    super(`/tfl/report/${uploadId}`);
  }
}
