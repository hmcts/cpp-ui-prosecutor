import { ElementFinder } from 'protractor';

export interface FormInputValue {
  type: 'text' | 'tel' | 'radio' | 'checkbox' | 'select' | 'number' | 'file';
  name: string;
  selector?: () => ElementFinder;
  value?: string;
}
