# UI Prosecutor

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

## App set up

- Node version: `8.16.1`
- Npm version: `6.4.1`
- Angular CLI version: `7.3.0`

It is recommended to use [NVM](https://github.com/nvm-sh/nvm) for Node installations

```
nvm install 8.16.1
npm install -g @angular/cli@7.3.0
```

Add the following configs to the `~/.npmrc` file.

```
registry=https://libraries.mdv.cpp.nonlive/artifactory/api/npm/npm-virtual
strict-ssl=false
```

Create a new json file in `src/app/config/` folder with name `app.override.config.json` and add the below config

```
{
  "_WARNING": "Do not commit this file, as it's overwritten during deployment. Feel free to use it to test overrides of app.config.json properties locally",
  "apiRoot": "http://localhost:8181/api",
}

```

Forward port 8181 to any one of the ATCM dev servers

`ssh -L 8181:localhost:8080 STECCM05ACTAP01.cpp.nonlive`

Finally run `npm install` to install all packages

Run `npm start` for a dev server. Navigate to `http://localhost:4750/prosecutor`. The app will automatically reload if you change any of the source files.

## Run using local vagrant

Using the application with atcm-vagrant will provide an environment closer to the target environment ie

- Sign in via IdAM
- Integration with other UIs
- However the prosecutor app must be manually opened by url: http://localhost:7080/prosecutor/<tfl/tvl>

#### Configuration

1. Run
   `cp src/app/config/app.override.config.sample.json src/app/config/app.override.config.json`

2. Set the VAGRANT_DIR environment variable to the location of your atcm-vagrant workspace.

#### Deployment

1. Run
   `npm run start:vagrant`.
2. Browse to the url `http://localhost:7080` and login
3. Manually change to the prosecutor app using
   http://localhost:7080/prosecutor or
   http://localhost:7080/prosecutor/tfl

Code changes will be automatically deployed. There is no live reload of the browser.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via jest.

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

You may need to run `npm run webdriver-manager update` before running the test suite. 

Results are output in console with a detailed HTML report generated in `build/e2e/screenshots/index.html`

### Running against remote backend

Make sure you have `app.override.config.json` setup as above.

```bash
# terminal 1 - tunnel to backend
ssh -L8181:localhost:8080 STECCM05ACTAP01.cpp.nonlive

# terminal 2 - run the frontend app
npm start

# terminal 3 - run the e2e tests
npm run e2e
```

### Running against remote frontend

If running against STE or DEV, you will need to setup a network proxy:

1. On Mac, open Network Preferences > Advanced > Proxies
2. Enable SOCKS proxy with localhost:8182

```bash
# terminal 1 - tunnel to frontend slave
# note that with proxy enabled, all traffic is routed here, hence you will lose network if this tunnel is not up
ssh -C -D 8182 STECCMSLAVE01.cpp.nonlive

# terminal 2 - tunnel to backend
ssh -L8181:localhost:8080 STECCM05ACTAP01.cpp.nonlive

# terminal 3 - run the e2e tests against the remote url
npm run e2e:remote -- --baseUrl http://steccm05wrpxy01.cpp.nonlive/prosecutor/
```

Or against SIT
```bash
ssh -L 8181:localhost:8080 SITCCM01ACTAP06.cpp.nonlive
npm run e2e:remote -- --baseUrl https://cpp-sit.nftpr1.cjscp.org.uk/sjp/
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


