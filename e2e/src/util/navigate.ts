import { User } from '@cpp/ui.priming';
import { $, browser, ExpectedConditions } from 'protractor';
import { join } from 'path';
import { loginAs } from './loginAs';
import { TFL_USER } from '../../../tools/utils';

let appLoaded: boolean;
let loggedInUser: User;

export const navigate = async (url: string, user: User) => {
  const currentUser = user ? user : loggedInUser ? loggedInUser : TFL_USER;

  if (browser.params.integration !== 'integrated') {
    if (!appLoaded) {
      await browser.get('./'); // need to load the app the first time this is run, to enable setting session storage
      appLoaded = true;
    }
    await browser.executeScript(`return window.sessionStorage.setItem('CJSCPPUID', '${user.userId}')`);
  } else if (!loggedInUser || loggedInUser !== currentUser) {
    await loginAs({ email: user.email });
    loggedInUser = user;
  }
  await browser.get(join('.', url));
  await isStable();
};

export const isStable = () => {
  return Promise.all([
    browser.driver.wait(ExpectedConditions.invisibilityOf($('pdk-activity-indicator'))),
    browser.waitForAngular()
  ]);
};
