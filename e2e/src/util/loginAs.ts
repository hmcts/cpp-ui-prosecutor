import { $, browser, by, element, ExpectedConditions } from 'protractor';
import { parse } from 'url';

export const loginAs = ({ email, password = '1Password2!' }: { email: string; password?: string }) => {
  const $logout = element(by.linkText('Sign out'));
  const $email = $('#idToken1');
  const $password = $('#idToken2');
  const $submitBtn = $('#loginButton_0');
  const $confirmSignoutButton = $('#sign-out-button');

  return browser.controlFlow().execute(async () => {
    await browser.waitForAngularEnabled(false);

    return $logout
      .isPresent()
      .then(async present => {
        if (present) {
          await $logout.click();
          await $confirmSignoutButton.click();
        } else {
          await browser.get('./');
        }
        return browser.wait(ExpectedConditions.presenceOf($email), 10000);
      })
      .then(async () => {
        await $email.sendKeys(email);
        await $password.sendKeys(password);
        await $submitBtn.click();

        // match on url hostname to determine when login redirect has completed, as
        // this accommodates basic auth params being present in the baseUrl
        return browser.wait(
          () =>
            browser.getCurrentUrl().then(currentUrl => {
              const { hostname: current } = parse(currentUrl);
              const { hostname: target } = parse(browser.baseUrl);

              return current === target;
            }),
          10000
        );
      })
      .then(() => browser.waitForAngularEnabled(true));
  });
};
