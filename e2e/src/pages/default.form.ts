import { FormInputValue } from '../interfaces/form.interface';
import { $, browser } from 'protractor';
import { isStable } from '../util';

export class DefaultForm {
  async setValues(formInputValues: FormInputValue[]) {
    await formInputValues.reduce(async (promise, inputValue) => {
      await promise;

      if (['text', 'tel', 'number', 'file'].includes(inputValue.type)) {
        const input = inputValue.selector
          ? inputValue.selector()
          : $(`input[type=${inputValue.type}][name=${inputValue.name}]`);

        await input.clear();
        await input.sendKeys(inputValue.value);

        if (inputValue.type === 'file') {
          await browser.executeScript(`arguments[0].dispatchEvent(new Event('input'))`, input);
        }
      } else {
        const input = inputValue.selector
          ? inputValue.selector()
          : $(`input[type=${inputValue.type}][value="${inputValue.value}"]`);

        await input.click();
        await isStable();
      }
    }, Promise.resolve());
  }

  async submit() {
    await $('button[type=submit]').click();
    await isStable();
  }
}
