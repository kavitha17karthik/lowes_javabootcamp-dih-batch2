import { CONTINUE_WORKFILE_URL, PROCESS_WORKFILE_URL, WARRANTY_URL } from '../apiConfigUrls';

class RebateScreenPage {
  warrantyProcessWorkFileStub() {
    cy.intercept('POST', PROCESS_WORKFILE_URL, {
      fixture: 'warranty/processWorkfile'
    }).as('Pre Warranty Process WorkFile');
    cy.intercept('POST', WARRANTY_URL, {
      fixture: 'warranty/preWarranty'
    }).as('Pre Warranty');
  }

  validateWarrantyScreen(msg) {
    cy.get('[data-qtag-lpp-headertext="true"]').should('have.text', msg);
  }

  selectWarrantyOption() {
    cy.get('div').contains(`No thanks, I'm OK with a limited warranty.`).click();
  }

  applyWarrantyStub() {
    cy.intercept('POST', WARRANTY_URL, {
      fixture: 'warranty/applyWarranty'
    }).as('Apply Warranty');
  }

  clickApply() {
    cy.get('[data-qtag-paynow-btn="true"]').should('be.visible').click();
  }

  validateRebateHeader(msg) {
    cy.get('[data-qtag-confirmation-text="true"]').should('have.text', msg);
  }

  printReceiptStub() {
    cy.intercept('POST', CONTINUE_WORKFILE_URL, {
      fixture: 'rebateItem/printReceipt'
    }).as('Print');
  }
}

export default new RebateScreenPage();
