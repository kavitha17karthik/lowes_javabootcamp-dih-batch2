// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import SocketInteraction from './pages/socketInteraction';
import { initServer } from './server';
import { getAppConfig, makeAsyncCall } from './utils';
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import { FIXED_STUBBED_URLS } from './constants';
import 'cypress-wait-until';
import StoreSignIn from '../support/pages/storeSignInPages';

addMatchImageSnapshotCommand({
  customSnapshotsDir: './cypress/snapshots'
});

const { appUrl, emulatorContacts, enableE2E, tachyonWebSocketCMApi, bffAppUrl } = getAppConfig();
// eslint-disable-next-line no-unused-vars
let socket;

export const launchScoApplication = (params, config = '') => {
  if (params === '@BFF') {
    cy.bffAppLauncher();
    StoreSignIn.initiateBffLaneOpen();
  } else {
    cy.loadApplication(config);
    StoreSignIn.initiateLoginStubs();
  }
};

export const prepareAppUrl = (config, url) => {
  const key = Object.keys(config);
  const value = Object.values(config);
  return `${url}&${key}=${value}`;
};
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
Cypress.Commands.add('loadApplication', (config = {}) => {
  const applicationUrl = config // ?.enableManualUnlockCollection
    ? prepareAppUrl(config, appUrl) // `${appUrl}&enableManualUnlockCollection=${config.enableManualUnlockCollection}`
    : appUrl;

  cy.visit(applicationUrl, {
    onBeforeLoad(win) {
      initServer('CASH_MANAGEMENT');
      cy.stub(win, 'WebSocket', () => {
        const wb = new WebSocket(tachyonWebSocketCMApi);
        socket = new SocketInteraction(wb);
        window.socket = socket;
        return wb;
      });
    },
    timeout: 100000
  });
});

// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
Cypress.Commands.add('bffAppLauncher', (config = {}) => {
  try {
    const applicationUrl = config // ?.enableManualUnlockCollection
      ? prepareAppUrl(config, bffAppUrl) // `${bffAppUrl}&enableManualUnlockCollection=${config.enableManualUnlockCollection}`
      : bffAppUrl;
    cy.visit(applicationUrl, {
      onBeforeLoad(win) {
        initServer('CASH_MANAGEMENT');
        cy.stub(win, 'WebSocket', () => {
          const wb = new WebSocket(tachyonWebSocketCMApi);
          socket = new SocketInteraction(wb);
          window.socket = socket;
          return wb;
        });
      },
      timeout: 100000
    });
  } catch (error) {
    console.log('error', error);
  }
});

Cypress.Commands.add('reloadApplication', () => {
  cy.reload();
});

Cypress.Commands.add('scanCard', (cardDetails = {}) => {
  const { form, buttonPressed } = cardDetails;
  const url = `${emulatorContacts}&state={"form":"${form}","buttonPressed":"${buttonPressed}"}`;
  if (enableE2E) {
    cy.request(url).then((response) => {
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    });
  } else {
    return makeAsyncCall(300);
  }
});

Cypress.Commands.add('completePinPadAction', (pinpadActions = {}) => {
  const { buttonPressed, form } = pinpadActions;
  const url = `${emulatorContacts}&state={"form":"${form}","buttonPressed":"${buttonPressed}"}`;
  cy.request(url).then((response) => {
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  });
});

// pass scan code barcode/qr code etc with this format: ^12323456[114q
Cypress.Commands.add('scan', (param = '') => {
  cy.get('#hiddenInputField').focus().clear().type(param, {
    parseSpecialCharSequences: false
  });
});

Cypress.Commands.add('scanManagerPasscode', (param = '') => {
  cy.get('[data-qtag-managerapproval-input]').type(param);
});

/**
 * @param method [GET, POST, PUT, PATCH, DELETE]
 * @param request api url
 * @param fixture fixtures/api response
 * @param explicitTurnStub explicitly turn on stubbed response in case of e2e tests as well
 */
Cypress.Commands.overwrite('intercept', (originalIntercept, ...args) => {
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  // check whether the first or second argument is url
  const requestURL =
    typeof args[0] === 'string' && !methods.includes(args[0].toLocaleUpperCase())
      ? args[0]
      : args[1];
  const shouldStubbedResponse = FIXED_STUBBED_URLS.includes(requestURL);

  if (enableE2E && !shouldStubbedResponse) {
    args.pop();
  }
  return originalIntercept(...args);
});

export { socket };
