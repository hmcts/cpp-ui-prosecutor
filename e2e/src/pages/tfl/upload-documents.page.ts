import { BasePage } from '../base.page';
import { DefaultForm } from '../default.form';
import { FormInputValue } from '../../interfaces/form.interface';
import { $, $$ } from 'protractor';
import { deleteFile } from '../../../../tools/utils';

export class UploadDocumentsPage extends BasePage {
  readonly form = new DefaultForm();
  readonly successAlert = $('pdk-context-panel');
  readonly errorMessages = $$('pdk-error-message');

  constructor() {
    super(`/tfl/upload-documents`);
  }

  public async setFormValues(inputValues: FormInputValue[]) {
    await this.form.setValues(inputValues);
  }

  public async submitForm(documentFile: string) {
    const inputValues: FormInputValue[] = [{ type: 'file', name: 'documentsZipFile', value: documentFile }];

    await this.setFormValues(inputValues);
    await this.form.submit();
    await deleteFile(documentFile);
  }
}
