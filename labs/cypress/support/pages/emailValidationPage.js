import {
  CONTINUE_WORKFILE_URL,
  DP_PAYMENT_END_URL,
  DP_PRINT_URL,
  DP_TRANSACTION_END_URL,
  FORMAT_RECEIPT_TEMPLATE_URL,
  POST_PROCESS_URL
} from '../apiConfigUrls';
class EmailValidationPage {
  validateIsEmailCorrect(message) {
    cy.get('[data-qtag-confirmation-text="true"]').should('have.text', message);
  }

  noButtonClick() {
    cy.get('[data-qtag-nobtn="true"]').should('be.visible').click();
  }

  noButtonClickStub() {
    cy.intercept('POST', CONTINUE_WORKFILE_URL, {
      fixture: 'tenderType/tenderWithCardPayment/tender/noButtonClick'
    }).as('Email not correct Selection');
  }

  yesButtonClick() {
    cy.get('[data-qtag-yesbtn="true"]').should('be.visible').click();
  }

  emailIdConfirmedStub() {
    cy.intercept('POST', CONTINUE_WORKFILE_URL, {
      fixture: 'tenderType/tenderWithCardPayment/tender/emailIdConfirmed'
    }).as('Correct EmailId');
    cy.intercept(DP_PAYMENT_END_URL, {
      fixture: ''
    }).as('Payment End');
    cy.intercept('POST', FORMAT_RECEIPT_TEMPLATE_URL, {
      fixture: 'tenderType/tenderWithCardPayment/tender/formatReceiptTemplate'
    }).as('formatReceiptTemplate');
    cy.intercept('POST', POST_PROCESS_URL, {
      fixture: 'tenderType/tenderWithCardPayment/tender/postProcess'
    }).as('Post Process');
    cy.intercept(DP_PRINT_URL, {
      fixture: 'devicePlatform/printer'
    }).as('printer Print');
    cy.intercept(DP_TRANSACTION_END_URL, {
      fixture: ''
    }).as('Transaction End');
  }

  validateEnterYourEmailMessage() {
    cy.get('[data-qtag-ereceipt-text="true"]').should('have.text', 'Please enter your email.');
  }

  enterEmailAndTapApply(emailId) {
    cy.get('[type="text"]').type(emailId);
    cy.get('[data-key="Apply"]').click();
  }

  emailAppliedStub() {
    cy.intercept('POST', CONTINUE_WORKFILE_URL, {
      fixture: 'tenderType/tenderWithCardPayment/tender/emailApplied'
    }).as('Email Applied');
  }

  enterInvalidEmailAndTapApply(invalidEmailId) {
    const item = invalidEmailId.toString().split('');
    this.clearExistingMailId();
    item.forEach((element) => {
      cy.get(`[data-testid="${element}"]`).click();
    });
    cy.get('[data-key="Apply"]').click();
  }

  clearExistingMailId() {
    for (let i = 0; i < 14; i++) {
      cy.get('[data-key="backspace"]').click();
    }
    cy.get('[data-key="Apply"]').click();
  }

  invalidEmailError(errMsg) {
    cy.get('[data-qtag-ereceipt-invalidentry="true"]').should('have.text', errMsg);
  }
}

export default new EmailValidationPage();
