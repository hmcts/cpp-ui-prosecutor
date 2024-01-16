import { $, browser, by, element, ExpectedConditions } from 'protractor';
import { isStable } from './navigate';

export const loginAs = ({ email, password = '1Password2!' }: { email: string; password?: string }) => {
  const $logout = element(by.linkText('Sign out'));
  const $email = $('#idToken1');
  const $password = $('#idToken2');
  const $submitBtn = $('#loginButton_0');
  const $confirmSignoutButton = $('#sign-out-button');
  let signedOut = false;

  return browser.controlFlow().execute(async () => {
    await browser.waitForAngularEnabled(false);

    return $logout
      .isPresent()
      .then(async present => {
        if (present) {
          await $logout.click();
          await browser.wait(ExpectedConditions.presenceOf($confirmSignoutButton), 10000);
          await $confirmSignoutButton.click();
          signedOut = true;
        } else {
          await browser.get('./');
        }
        return browser.wait(ExpectedConditions.presenceOf($email), 10000);
      })
      .then(async () => {
        await $email.sendKeys(email);
        await $password.sendKeys(password);
        await $submitBtn.click();

        await isStable();

        await browser.sleep(2000);

        if (signedOut) {
          await browser.refresh();
        }
      })
      .then(() => browser.waitForAngularEnabled(true));
  });
};
