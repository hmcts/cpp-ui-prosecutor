import { $, browser, ExpectedConditions } from 'protractor';
import { join } from 'path';
import { loginAs } from './loginAs';
import { TestUser } from '../../../tools/utils';

let appLoaded: boolean;
let loggedInUser: TestUser;

export const navigate = async (url: string, user: TestUser) => {

  if (browser.params.dev === 'dev') {
    if (!appLoaded) {
      await browser.get('./'); // need to load the app the first time this is run, to enable setting session storage
      appLoaded = true;
    }
    await browser.executeScript(`return window.sessionStorage.setItem('CJSCPPUID', '${user.userId}')`);
  } else if (!loggedInUser || loggedInUser !== user) {
    await loginAs(user);
    loggedInUser = user;
  }

  await browser.get(join('.', url));
  await isStable();
};

export const isStable = () => {
  return Promise.all([
    browser.driver.wait(ExpectedConditions.invisibilityOf($('pdk-activity-indicator')), 30000, 'failed on isStable activity indicator'),
    browser.waitForAngular()
  ]);
};
