import {
  DP_TRANSACTION_ABORT_URL,
  DP_TRANSACTION_END_URL,
  RESET_WORKFILE_URL,
  DP_REGISTER_URL,
  CANCEL_WORKFILE_URL
} from '../apiConfigUrls';
import { KEYBOARD_NUMBER_ELEMENTS } from '../../support/constants';
class Cart {
  get cartPagelineItem() {
    return cy.get('[data-qtag-cartpage-lineitem="1"]');
  }

  get cartItemCount() {
    return cy.get('[data-qtag-cart-itemcount="true"]');
  }

  get payNowButton() {
    return cy.get('[data-qtag-paynow-btn="true"]');
  }

  get cartItemNumber() {
    return cy.get('[data-qtag-cartpage-lineitem-itemnumber]');
  }

  get removeButton() {
    return cy.get('[data-testid="intervention_approve_btn"]');
  }

  get removeCancelButton() {
    return cy.get('[data-testid="intervention_decline_btn"]');
  }

  getCartPagelineItem(lineNumber) {
    return cy.get(`[data-qtag-cartpage-lineitem="${lineNumber}"]`);
  }

  validateCartPage(lineNumber) {
    cy.get(`[data-qtag-cartpage-lineitem="${lineNumber}"]`).should('be.visible');
    cy.get('[data-qtag-cartpage-lineitem-image="true"]').should('be.visible');
    cy.get('[data-qtag-cartpage-lineitem-itemnumber="true"]').should('be.visible');
    cy.get('[data-qtag-cartpage-lineitem-itemdescription="true"]').should('be.visible');
    cy.get('[data-qtag-cartpage-lineitem-itemprice="true"]').should('be.visible');
    cy.get('[data-qtag-cartpage-lineitem-aggregatedprice="true"]').should('be.visible');
    cy.get('[data-qtag-footer-total-savings="true"]').should('be.visible');
    cy.get('[data-qtag-cartsavings="true"]').should('be.visible');
    cy.get('[data-qtag-cartsubtotal-label="true"]').should('be.visible');
    cy.get('[data-qtag-footer-sub-total="true"]').should('be.visible');
    cy.get('[data-qtag-paynow-btn="true"]').should('be.visible');
  }

  clickOnCartPageBffLineItem() {
    cy.get(`[data-qtag-cartpage-lineitem]`).should('be.visible').click();
  }

  clickOnBffLineItemWithId(cartItemId) {
    cy.get(`[data-qtag-cartpage-lineitem=${cartItemId}]`).should('be.visible').click();
  }

  validateUpdateItemPage(lineNumber) {
    cy.get(`[data-qtag-cartpage-lineitem="${lineNumber}"]`).should('be.visible');
    cy.get('[data-qtag-removeitem-btn="true"]').should('be.visible');
    cy.get('[data-qtag-common-backbtn="true"]').should('be.visible');
    cy.get('[data-qtag-itemimage="true"]').should('be.visible');
    cy.get('[data-qtag-itemdescription="true"]').should('be.visible');
    cy.get('[data-qtag-itemqty-input="true"]').should('be.visible');
    cy.get('[data-qtag-itemsellingdiscount-input="true"]').should('be.visible');
    cy.get('[data-qtag-itemsellingprice-input="true"]').should('be.visible');
    KEYBOARD_NUMBER_ELEMENTS.forEach((element) => {
      cy.get(`[data-qtag-alpha-key="${element}"]`).should('be.enabled');
    });
  }

  validateItemQuantity(quantity) {
    cy.get('[data-qtag-cartpage-lineitem-quantity="true"]')
      .should('be.visible')
      .should('have.text', `Qty ${quantity}`);
  }

  validateRemoveItemConfirmation(itemNumber) {
    cy.get('[data-qtag-intervention-approvalreason-msg="true"]').should(
      'have.text',
      'Are you sure you want to remove this item?'
    );
    cy.get('[data-qtag-intervention-agerestricted-msg="true"]')
      .should('be.visible')
      .should('have.text', 'An associate will collect this item before payment.');
    cy.get('[data-qtag-intervention-itemnumber="true"]').contains(`Item #${itemNumber}`);
  }

  crNonOperationalClearCartStubs() {
    cy.intercept(DP_TRANSACTION_ABORT_URL, {
      fixture: ''
    }).as('Transaction Abort');
    cy.intercept(DP_TRANSACTION_END_URL, {
      fixture: ''
    }).as('Transaction End');
    cy.intercept(CANCEL_WORKFILE_URL, {
      fixture: 'intervention/resetWorkfile'
    }).as('Cancel Work File');
    cy.intercept(RESET_WORKFILE_URL, {
      fixture: 'intervention/resetWorkfile'
    }).as('Reset Work File');
    cy.intercept('GET', DP_REGISTER_URL, {
      fixture: 'intervention/register'
    }).as('Register Cards Only');
  }
}

export default new Cart();
