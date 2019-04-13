import { $, browser, by, element, ExpectedConditions } from 'protractor';
import { parse } from 'url';

export const loginAs = ({ email, password = '1Password2!' }: { email: string; password?: string }) => {
  return new Promise(resolve => {
    const $logout = element(by.linkText('Sign out'));
    const $email = $('#idToken1');
    const $password = $('#idToken2');
    const $submitBtn = $('#loginButton_0');

    browser.controlFlow().execute(async () => {
      await browser.waitForAngularEnabled(false);
      await $logout
        .isPresent()
        .then(present => {
          if (present) {
            $logout.click();
          } else {
            browser.get('./');
          }
          return browser.wait(ExpectedConditions.presenceOf($email), 10000);
        })
        .then(() => {
          $email.sendKeys(email);
          $password.sendKeys(password);
          browser.sleep(10000000);
          $submitBtn.click();

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

      resolve();
    });
  });
};
