# Prosecutor

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

## App set up

Node version: `8.15.0` and above

Npm version: `6.4.1` and above

Add the following configs to the `~/.npmrc` file.

```
registry=https://libraries.mdv.cpp.nonlive/artifactory/api/npm/npm-virtual
strict-ssl=false
```

Make sure that angular cli is installed globally or run `npm install -g @angular/cli`

Create a new json file in `src/app/config/` folder with name `app.override.config.json` and add the below config

```
{
  "_WARNING": "Do not commit this file, as it's overwritten during deployment. Feel free to use it to test overrides of app.config.json properties locally",
  "apiRoot": "http://localhost:8181/api",
  "idamProfilePage": "http://10.124.22.69:81/idam/manageaccount",
  "idamLogout": "/gateway/SPInitiatedSLO"
}

```

Forward port 8181 to any one of the ATCM dev servers

`ssh -L8181:localhost:8080 STECCM05ACTAP01.cpp.nonlive`

Finally run `npm install` to install all packages

Run `npm start` for a dev server. Navigate to `http://localhost:4750/prosecutor`. The app will automatically reload if you change any of the source files.

### Run app in local vagrant with idam simulator

Change `apiRoot` in `app.override.config.json` file to `http://localhost:7080/api` and then run
`npm run start:idam`. You can browse the app using url `http://localhost:7080/prosecutor/`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via jest.

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
