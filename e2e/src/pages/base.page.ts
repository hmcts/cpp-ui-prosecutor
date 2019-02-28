export class BasePage {
  constructor(protected url: string) {}

  getUrl() {
    return this.url;
  }
}
