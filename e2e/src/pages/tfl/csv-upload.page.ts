import { BasePage } from '../base.page';
import { DefaultForm } from '../default.form';
import { FormInputValue } from '../../interfaces/form.interface';
import { $, $$ } from 'protractor';
import { deleteFile } from '../../../../tools/utils';

export class CsvUploadPage extends BasePage {
  readonly form = new DefaultForm();
  readonly successAlert = $('pdk-alert');
  readonly errorMessages = $$('pdk-error-message');

  constructor() {
    super(`/tfl/csv-upload`);
  }

  public async setFormValues(inputValues: FormInputValue[]) {
    await this.form.setValues(inputValues);
  }

  public async submitForm(headerFile: string, offenceFile: string) {
    const inputValues: FormInputValue[] = [
      { type: 'file', name: 'headerCsv', value: headerFile },
      { type: 'file', name: 'offencesCsv', value: offenceFile }
    ];

    await this.setFormValues(inputValues);
    await this.form.submit();

    await deleteFile(headerFile);
    await deleteFile(offenceFile);
  }
}
