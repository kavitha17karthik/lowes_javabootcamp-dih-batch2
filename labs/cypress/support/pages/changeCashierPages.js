import { LOGIN_URL } from '../apiConfigUrls';
import { getAppConfig } from '../../support/utils';

const { host } = getAppConfig();
class ChangeCashierPage {
  get cashierName() {
    return cy.get('[data-qtag-change-cashier-input-field="true"]').should('be.visible');
  }

  scanValidQRCode() {
    cy.intercept('POST', LOGIN_URL, {
      fixture: 'changeCashier/LoginSuccess/login'
    }).as('validQRcode');
    cy.fixture('common/cashierLoginDetails').then((cashierData) => {
      const details = cashierData[host]['valid'];
      this.cashierName.should('be.visible').type(details.QRCode);
      return;
    });
  }

  scanInValidQRCode() {
    cy.intercept('POST', LOGIN_URL, {
      statusCode: 500,
      body: {}
    }).as('invalidQRcode');
    cy.fixture('common/cashierLoginDetails').then((cashierData) => {
      const details = cashierData[host]['invalid'];
      this.cashierName.should('be.visible').type(details.QRCode);
      return;
    });
  }

  validateChangeCashierInputField() {
    cy.get('[data-qtag-change-cashier-input-field="true"]').should('be.visible');
  }

  validateToastMessage() {
    cy.get('[data-qtag-toastmsg="true"]').should('be.visible');
  }

  validateInvalidQRCode() {
    cy.get('[data-qtag-errorbanner="true"]').should('be.visible');
    cy.get('[data-qtag-cancel-btn="true"]').should('be.visible');
  }

  validateChangeCashierPage() {
    cy.get('[data-qtag-cancel-btn="true"]').should('be.visible');
    cy.get('[data-qtag="current-cashier-name-header"]').should('be.visible');
    cy.get('[data-qtag="cashier-entry-title"]').should('be.visible');
    cy.get('[data-qtag-change-cashier-input-field="true"]').should('be.visible');
  }
}

export default new ChangeCashierPage();
