import { BasePage } from '../base.page';
import { $ } from 'protractor';

export class ViewDocumentUploadReportPage extends BasePage {
  public readonly heading = $('h1');

  public readonly fileName = $(`[data-role='file-name']`);
  public readonly errorStatus = $(`[data-role='document-upload-status']`);

  constructor(uploadId: string) {
    super(`/tfl/check-document-uploads/report/${uploadId}`);
  }
}
