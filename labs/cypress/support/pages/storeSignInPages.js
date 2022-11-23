import {
  CARBON_APIS,
  DP_LANE_ERROR_URL,
  DP_LANE_OPEN_URL,
  DP_REGISTER_URL,
  LOGIN_URL,
  REGISTERINFO_URL,
  REGISTER_LOGIN_JOURNAL_URL,
  REGISTER_START_URL,
  REGISTER_STATUS_URL,
  USERINFO_URL
} from '../apiConfigUrls';
import { getAppConfig } from '../../support/utils';

const { host } = getAppConfig();

let dlDetails = {};
class StoreSignIn {
  initiateLoginStubs(tenderType = '') {
    cy.intercept('GET', USERINFO_URL, { fixture: 'common/userInfo' }).as('userInfo');
    cy.intercept('GET', REGISTER_START_URL, {
      fixture: 'common/registerStart'
    }).as('registerStart');
    cy.intercept('GET', REGISTERINFO_URL, {
      fixture: `common/registerInfo${tenderType}`
    }).as(`${tenderType}registerInfo`);
    cy.intercept('GET', REGISTER_STATUS_URL, {
      fixture: `common/registerStatus${tenderType}`
    }).as(`${tenderType}registerStatus`);
    cy.intercept(REGISTER_LOGIN_JOURNAL_URL, {
      fixture: 'common/loginJournal'
    }).as('loginJournal');
  }

  initiateSigcapErrorStubs(tenderType = '') {
    cy.intercept('GET', USERINFO_URL, { fixture: 'common/userInfo' }).as('userInfo');
    cy.intercept('GET', REGISTER_START_URL, {
      fixture: 'common/registerStart'
    }).as('registerStart');
    cy.intercept('GET', REGISTERINFO_URL, {
      fixture: `common/registerInfo${tenderType}`
    }).as(`${tenderType}registerInfo`);
    cy.intercept('GET', REGISTER_STATUS_URL, {
      fixture: `common/registerStatus${tenderType}`
    }).as(`${tenderType}registerStatus`);
    cy.intercept(REGISTER_LOGIN_JOURNAL_URL, {
      statusCode: 500,
      body: {
        statusDetails: {
          error: {
            errorTxt: 'Register not found.',
            errorId: 'ERR_REG_NOT_FOUND',
            errorState: 'retry'
          }
        }
      }
    }).as('loginJournal');
  }

  initiateBffLaneOpen() {
    cy.intercept('GET', USERINFO_URL, { fixture: 'common/userInfo' }).as('userInfo');
    cy.intercept('GET', DP_REGISTER_URL, {
      fixture: 'devicePlatform/register'
    }).as('tachyonRegister');
    cy.intercept('GET', CARBON_APIS.URLS.REG_D_START, {
      fixture: 'common/registerStart'
    }).as('registerStart');
    cy.intercept('GET', CARBON_APIS.URLS.REG_INFO, {
      fixture: `common/registerInfo`
    }).as(`registerInfo`);
    cy.intercept('GET', CARBON_APIS.URLS.LOGIN_JOURNAL, {
      fixture: 'common/loginJournal'
    }).as('loginJournal');
    cy.intercept('GET', CARBON_APIS.URLS.REG_D_STATUS, {
      fixture: `common/registerStatus`
    }).as(`registerStatus`);
    cy.intercept('GET', CARBON_APIS.URLS.STORE_INFO, {
      fixture: 'common/bffStoreInfo'
    }).as('bffStoreInfo');
  }

  registerInfoCash() {
    cy.intercept('GET', REGISTERINFO_URL, {
      fixture: 'common/registerInfoCash'
    }).as('registerInfo');
  }

  stubbedLoginViaCredentials() {
    cy.intercept('POST', LOGIN_URL, {
      fixture: 'storeSignIn/LoginSuccess/login'
    }).as('login');
    cy.intercept(DP_LANE_OPEN_URL, { fixture: 'devicePlatform/laneOpen' }).as('laneOpen');
    cy.fixture('common/loginDetails').then((loginData) => {
      const details = loginData[host]['associate'];
      this.userName.should('be.visible').type(details.username);
      this.password.should('be.visible').click();
      this.enterPasswordAndSignIn(details.password);
      return;
    });
  }

  stubbedLoginViaQRCode() {
    cy.intercept('POST', LOGIN_URL, {
      fixture: 'storeSignIn/LoginSuccess/login'
    }).as('login');
    cy.intercept(DP_LANE_OPEN_URL, { fixture: 'devicePlatform/laneOpen' }).as('laneOpen');
    cy.fixture('common/loginDetails').then((loginData) => {
      const details = loginData[host]['associate'];
      this.userName.should('be.visible').type(details.QRCode);
      return;
    });
  }

  subbedStoreLoginViaCredentials() {
    cy.intercept('POST', LOGIN_URL, {
      fixture: 'storeSignIn/storeLoginSuccess/login'
    }).as('login');
    cy.intercept(DP_LANE_OPEN_URL, { fixture: 'devicePlatform/laneOpen' }).as('laneOpen');
    cy.fixture('common/loginDetails').then((loginData) => {
      const details = loginData[host]['associateSecondaryLogin'];
      this.userName.should('be.visible').type(details.username);
      this.password.should('be.visible').click();
      this.enterPasswordAndSignIn(details.password);
      return;
    });
  }

  storemodeLogin() {
    cy.get('[data-testid="scanBody"]').click();
    cy.wait(1000);
    this.storeMoeButton.should('have.text', 'Store Mode').click();
    cy.intercept('POST', LOGIN_URL, {
      fixture: 'storeSignIn/LoginSuccess/login'
    }).as('login');
    cy.fixture('common/loginDetails').then((loginData) => {
      const details = loginData[host]['associate'];
      this.userName.should('be.visible').type(details.QRCode);
      return;
    });
  }

  stubbedInvalidLogin() {
    cy.intercept('POST', LOGIN_URL, (req) => {
      req.reply({
        statusCode: 401, // default
        fixture: ''
      });
    }).as('InvalidLogin');
    cy.intercept(DP_LANE_ERROR_URL, { fixture: 'devicePlatform/laneError' }).as('laneError');
    cy.fixture('common/loginDetails').then((loginData) => {
      const details = loginData[host]['associate'];
      this.userName.should('be.visible').type(details.QRCode);
      return;
    });
  }

  get signInButton() {
    return cy.get("button[data-testid='signin-button']");
  }

  get signInHeader() {
    return cy.get('[data-qtag-signin-header]');
  }

  get userName() {
    return cy.get('[data-qtag-username-input]');
  }

  get password() {
    return cy.get('[data-qtag-password-input]');
  }

  get connectingToHardware_spinnerMessage() {
    return cy.get('[data-qtag-transition="Connecting to hardware"]', {
      timeout: 20000
    });
  }

  get startScanning_screen() {
    return cy.get('[data-qtag-startscan-msg="true"]', {
      timeout: 100000
    });
  }

  get cardsOnly_startScanningScreen() {
    return cy.get('[data-qtag-startscan-cardsonly-msg]', {
      timeout: 100000
    });
  }

  get invalidQRScan_msg() {
    return cy.get('[data-qtag-errorbanner]');
  }

  get storeModePage() {
    return cy.get('[data-qtag-header-storemode]');
  }

  get payNowButton() {
    return cy.get('[data-qtag-paynow-btn]');
  }

  get exitStoreModeButton() {
    return cy.get('[data-qtag-storemode-btn]');
  }

  get storeMoeButton() {
    return cy.get('[data-qtag-storemode-btn]');
  }

  get clearCartButton() {
    return cy.get('[data-qtag-clearcart-btn]');
  }

  get clearCartConfirmationMessage() {
    return cy.xpath("//div[contains(text(),'Are you sure you want to clear the cart?')]");
  }

  get crErrorBannerMessage() {
    return cy.get('[data-qtag-peripheral-message]');
  }

  get closeBannerButton() {
    return cy.get('[data-qtag-hwerror-closebtn]');
  }

  get laneClosedScreen() {
    return cy.get('[data-qtag-laneclose-msg1="true"]');
  }

  enterPasswordAndSignIn(password) {
    const pass = password.split('');
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let numberFlag = false;
    pass.forEach((element) => {
      if (numbers.includes(element)) {
        !numberFlag && cy.get(`[data-key="123"]`).click();
        cy.get(`[data-qtag-alpha-key="${element}"]`).click();
        numberFlag = true;
      } else {
        numberFlag && cy.get(`[data-key="ABC"]`).click();
        cy.get(`[data-qtag-alpha-key="${element}"]`).click();
        numberFlag = false;
      }
    });
    cy.get('[data-key="Sign In"]').click();
  }

  enterDLCardNumber(cardType) {
    let flag = true;
    cy.fixture(`tenderType/tenderWithCardPayment/tender${cardType}/dlDetails`).then((cardData) => {
      dlDetails = cardData;
      const pin = dlDetails.number.pin.toString().split('');
      pin.forEach((pinNum) => {
        if (flag) {
          cy.get(`[data-key="123"]`).click();
          flag = false;
        }
        cy.get(`[data-testid="${pinNum}"]`).click();
      });
      cy.get('[data-key="Enter"]').click();
      cy.get('[data-key="Enter"]').click();
      return;
    });
  }
}
export default new StoreSignIn();
