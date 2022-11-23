import { ADDITEM_WORKFILE_URL, EDITITEM_WORKFILE_URL } from '../apiConfigUrls';
import { KEYBOARD_NUMBER_ELEMENTS } from '../../support/constants';
class BagPage {
  bagRequired(quantity = 0) {
    cy.intercept('POST', ADDITEM_WORKFILE_URL, {
      fixture: 'tenderType/tenderWithCardPayment/tender/addBagItemWorkFile'
    }).as('Add Bag Item WorkFile');
    cy.intercept('POST', EDITITEM_WORKFILE_URL, {
      fixture: 'tenderType/tenderWithCardPayment/tender/editBagItemWorkFile'
    }).as('Edit Bag Item WorkFile');

    if (quantity === 0) {
      cy.get(`[data-key="0"]`).click();
    } else {
      const item = quantity.toString().split('');
      item.forEach((element) => {
        cy.get(`[data-qtag-alpha-key="${element}"]`).click();
      });
    }
    this.enterButton.click();
  }

  clickBackButton() {
    this.validateBagPage();
    this.enterButton.click();
    cy.get('[data-qtag-quantity-errormsg]').should('have.text', 'Enter a valid qty.');
    cy.get('[data-qtag-common-backbtn]').click();
  }

  bagRequiredWithTenderBackButton(itemDetails, validateTenderPage = true) {
    this.validateBagPage(itemDetails?.quantity);
    itemDetails.newQuantity
      ? this.bagRequired(itemDetails?.newQuantity, validateTenderPage)
      : this.bagRequired(itemDetails?.quantity, validateTenderPage);
  }

  validateBagPage(quantity = '') {
    cy.get('[data-qtag-common-backbtn]').should('have.text', 'Back');
    cy.get('[data-qtag-bagfee-display-message]').should('have.text', 'How many bags did you use?');
    if (quantity === '' || quantity === 0) {
      cy.get('[data-qtag-quantity-input]').should('not.have.value');
    } else {
      //cy.get("[data-qtag-quantity-input]").should("have.value", quantity);
    }
    KEYBOARD_NUMBER_ELEMENTS.forEach((element) => {
      cy.get(`[data-qtag-alpha-key="${element}"]`).should('be.enabled');
    });
  }

  get enterButton() {
    return cy.get('[data-key="Enter"]');
  }
}

export default new BagPage();
