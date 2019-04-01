import { BasePage } from '../base.page';
import { $$ } from 'protractor';

export class SearchResultPage extends BasePage {
  public readonly searchResult = $$(`pdk-inset-text`);
  public readonly caseUrn = $$(`[data-role='urn']`);

  constructor(role: string) {
    super(`/${role}/search/result`);
  }
}
