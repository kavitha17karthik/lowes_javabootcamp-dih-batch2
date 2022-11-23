/// <reference types="cypress-xpath" />
import {
  DP_REGISTER_URL,
  DP_DEACTIVATE_URL,
  DP_TRANSACTION_SUSPEND_URL,
  SAVE_INVOICE_URL,
  DP_INTERVENTION_END_URL,
  RESET_WORKFILE_URL,
  EDITCART_WORKFILE_URL,
  DP_TRANSACTION_ABORT_URL,
  DP_INTERVENTION_START_URL,
  NEW_WORKFILE_URL,
  ADDITEM_WORKFILE_URL,
  DP_SIGNAL_URL,
  DP_TRANSACTION_START_URL
} from '../apiConfigUrls';
import { bffUrls } from '../bff-urls/bffUrls';

const reg = Cypress.env('SCO_REG');
const bffAppUrls = bffUrls(reg);

class Intervention {
  get StoreSignInButton() {
    return cy.get('[data-qtag-signin-btn="true"]');
  }

  get RemoveFromSaleButton() {
    return cy.get('[data-qtag-intervention-approvebtn="true"]');
  }

  get processing_spinnerMessage() {
    return cy.get('[data-qtag-transition="Processing"]', {
      timeout: 20000
    });
  }

  get ApproveNewQuantiyButton() {
    return cy.get('[data-qtag-intervention-approvebtn="true"]');
  }

  get KeepCurrentItemQuantityButton() {
    return cy.get('[data-qtag-intervention-declinebtn="true"]');
  }

  get interventionPageCancelButton() {
    return cy.xpath("//div[text()='Cancel']");
  }

  get suspendSaleButton() {
    return cy.xpath(
      "//button[@data-qtag-intervention-approvebtn='true']/span[contains(text(),'Suspend Sale')]"
    );
  }

  get viewCartButton() {
    return cy.xpath(
      "//button[@data-qtag-intervention-approve-secondary-btn='true']/span[contains(text(),'View Cart')]",
      {
        timeout: 20000
      }
    );
  }

  get interventionPageText() {
    return cy.get('[data-qtag-intervention-helpmsg="true"]');
  }

  get itemApprovalMessage() {
    return cy.get('[data-qtag-intervention-approvalreason-msg]');
  }

  get notSoldItemApprovalMessage() {
    return cy.get('[data-qtag-intervention-approvalreason="true"]');
  }

  get approveButton() {
    return cy.get('[data-qtag-intervention-approvebtn]>button');
  }

  get removeFromCartButton() {
    return cy.get('[data-qtag-intervention-declinebtn]');
  }

  get returnToCartButton() {
    return cy.get('[data-qtag-intervention-approvebtn]');
  }

  get OnScreenKeyEnter() {
    return cy.get('[data-testid="Enter"]');
  }

  validatedUnknownItemScreen() {
    cy.get('[data-qtag-intervention-approvebtn]').as('ContinueButton');
    // validate error page
    cy.get('[data-qtag-intervention-approvalreason]')
      .should('exist')
      .should('have.text', 'An invalid barcode was scanned.');
    cy.get('[data-qtag-intervention-descriptionmsg]')
      .should('exist')
      .should('have.text', 'Tap Continue then scan a valid barcode.');
    cy.get('@ContinueButton').should('exist').should('have.text', 'Continue');
    cy.get('@ContinueButton').click();
  }

  validateHelpIsOnTheWayPage(interventionMessage, scanType) {
    this.interventionPageText.should('be.visible').should('have.text', 'Help is on the way.');
    cy.get('[data-qtag-intervention-approvalmsg="true"]')
      .should('be.visible')
      .should('have.text', interventionMessage);
    cy.get('[data-qtag-signin-btn="true"]')
      .should('be.visible')
      .should('have.text', 'Store Sign In');
    cy.get('[data-qtag-scanasscbarcode-msg="true"')
      .should('be.visible')
      .should('have.text', this.getScanTypeMessage(scanType));
  }

  getScanTypeMessage(scanType) {
    return scanType === 'barcode'
      ? 'Associates can also scan their barcode.'
      : 'Associates can also scan their QR code.';
  }

  validateEnterTheFeetPage(pageHeaderMessage) {
    cy.get('[data-qtag-intervention-header="true"]')
      .should('be.visible')
      .should('have.text', pageHeaderMessage);
    cy.get('[data-qtag-intervention-msg="true"]')
      .should('be.visible')
      .should('have.text', 'Enter the # of feet.');
  }

  validateRemovedItemPage() {
    cy.get('[data-qtag-intervention-approvalreason-msg="true"]')
      .should('be.visible')
      .should('have.text', 'Removed item.');
    cy.get('[data-qtag-intervention-agerestricted-msg="true"]')
      .should('be.visible')
      .should('have.text', 'Take the item from the customer and remove from sale.');
    cy.get('[data-qtag-intervention-itemimage="true"]').should('be.visible');
    cy.get('[data-qtag-intervention-itemdescription="true"]').should('be.visible');
    cy.get('[data-qtag-intervention-itemmsg="true"]').should('be.visible');
    cy.get('[data-qtag-intervention-approvebtn="true"]')
      .should('be.visible')
      .should('have.text', 'Remove From Sale');
    cy.get('[data-qtag-intervention-declinebtn="true"]')
      .should('be.visible')
      .should('have.text', 'Keep Item');
  }

  validateReduceItemPage(currentQuantity, newQuantity) {
    cy.get('[data-qtag-current-item-quantity-warning-message="true"]')
      .should('be.visible')
      .should('have.text', `Current Item Quantity: ${currentQuantity}`);
    cy.get('[data-qtag-intervention-approvalreason-msg="true"]')
      .should('be.visible')
      .should('have.text', 'Reduced item quantity.');
    cy.get('[data-qtag-intervention-agerestricted-msg="true"]')
      .should('be.visible')
      .should('have.text', 'Verify the new quantity and take the removed items from the customer.');
    cy.get('[data-qtag-intervention-itemimage="true"]').should('be.visible');
    cy.get('[data-qtag-intervention-itemdescription="true"]').should('be.visible');
    cy.get('[data-qtag-intervention-itemmsg="true"]')
      .should('be.visible')
      .should('have.text', 'Quantity Reduced');
    cy.get('[data-qtag-new-quantity-label="true"]')
      .should('be.visible')
      .should('have.text', `New Qty ${newQuantity}`);
    cy.get('[data-qtag-intervention-approvebtn="true"]')
      .should('be.visible')
      .should('have.text', 'Approve New Quantity');
    cy.get('[data-qtag-intervention-declinebtn="true"]')
      .should('be.visible')
      .should('have.text', 'Keep Current Item Quantity');
  }

  validateUnknownErrorPage() {
    cy.get('[data-qtag-intervention-helpmsg="true"]')
      .should('be.visible')
      .should('have.text', 'Help is on the way.');
    cy.get('[data-qtag-intervention-approvalmsg="true"]')
      .should('be.visible')
      .should(
        'have.text',
        'An unknown error has occurred and the sale cannot be completed.\nAn associate will help you with your purchase.'
      );
    cy.get('[data-qtag-signin-btn="true"]')
      .should('be.visible')
      .should('have.text', 'Store Sign In');
    cy.get('[data-qtag-scanasscbarcode-msg="true"')
      .should('be.visible')
      .should('have.text', 'Associates can also scan their QR code.');
  }

  validateHardStopPage() {
    this.interventionPageText.should('be.visible').should('have.text', "Item can't be sold.");
    cy.get('[data-qtag-intervention-descriptionmsg]')
      .should('exist')
      .should('have.text', "This item can't be sold at self-checkout.");
  }

  validateCardsOnlyPrompt(interventionMessage) {
    cy.get('[data-qtag-confirmation-text]')
      .should('be.visible')
      .should('have.text', interventionMessage);
  }

  validatePaymentDeviceErrorPage() {
    cy.get('[data-qtag-intervention-approvalreason]')
      .should('be.visible')
      .should('have.text', 'There is a problem with a payment device.');
  }

  crNonOperationalSuspendSaleStubs() {
    cy.intercept(DP_INTERVENTION_END_URL, {
      fixture: ''
    }).as('Intervention End');
    cy.intercept(DP_DEACTIVATE_URL, {
      fixture: 'devicePlatform/activate'
    }).as('Deactivate');
    cy.intercept(DP_TRANSACTION_SUSPEND_URL, {
      fixture: ''
    }).as('Transaction Suspend');
    cy.intercept(SAVE_INVOICE_URL, {
      fixture: ''
    }).as('Save Invoice');
    cy.intercept(RESET_WORKFILE_URL, {
      fixture: 'intervention/resetWorkfile'
    }).as('Reset Work File');
    cy.intercept('GET', DP_REGISTER_URL, {
      fixture: 'intervention/register'
    }).as('Card Only');
  }

  interventionStartStub() {
    cy.intercept(DP_INTERVENTION_START_URL, {
      fixture: ''
    }).as('Intervention Start');
  }

  cartInterventionItemStub(itemType) {
    cy.intercept('POST', NEW_WORKFILE_URL, {
      fixture: 'addItem/AddItemEntry/newWorkFile'
    }).as('New WorkFile');
    cy.intercept('POST', ADDITEM_WORKFILE_URL, {
      fixture: `cartInterventionItems/${itemType}/addItemWorkFile`
    }).as('Add Item WorkFile');
    cy.intercept(DP_INTERVENTION_START_URL, {
      fixture: ''
    }).as('Intervention Start');
  }

  cartInterventionItemStubBFF(itemType) {
    cy.intercept('POST', bffAppUrls.inventoryLookup, {
      fixture: `cartInterventionItems/${itemType}/addItemWorkfile`
    }).as('Inventory Lookup');

    cy.intercept('POST', bffAppUrls.addItem, {
      fixture: 'bffAddItem/addItemCartIntervention'
    }).as('Add Item WorkFile');

    cy.intercept('POST', `${bffAppUrls.updateLineItem}6976470234975205258`, {
      fixture: 'bffUpdate_qty/updateQtyCartIntervention'
    }).as('Edit Item Workfile');

    cy.intercept(DP_INTERVENTION_START_URL, {
      fixture: ''
    }).as('Intervention Start');

    cy.intercept(DP_INTERVENTION_END_URL, {
      fixture: ''
    }).as('Intervention End');
  }

  interventionItemApproveStub(itemType) {
    cy.intercept('POST', ADDITEM_WORKFILE_URL, {
      fixture: `cartInterventionItems/${itemType}/addItemValidWorkfile`
    }).as('Add Item Valid WorkFile');
    cy.intercept(DP_INTERVENTION_END_URL, {
      fixture: ''
    }).as('Intervention End');
    cy.intercept(DP_SIGNAL_URL, {
      fixture: ''
    }).as('Signal End');
    cy.intercept(DP_TRANSACTION_START_URL, {
      fixture: ''
    }).as('Transaction Start');
  }

  viewCartFlowStubs() {
    cy.intercept(DP_DEACTIVATE_URL, {
      fixture: ''
    }).as('Decativate');
    cy.intercept(EDITCART_WORKFILE_URL, {
      fixture: ''
    }).as('Edit Cart');
    cy.intercept(DP_TRANSACTION_ABORT_URL, {
      fixture: ''
    }).as('Transaction Abort');
  }

  validateRemovedItemStep() {
    cy.get('[data-qtag-intervention-approvalreason-msg]')
      .should('exist')
      .should('have.text', 'Removed item');
    cy.get('[data-qtag-intervention-agerestricted-msg]')
      .should('exist')
      .should('have.text', 'Take the item from the customer.');

    cy.get('[data-testid="intervention_approve_btn"]').click();
  }

  validateMeasurementStep(qty) {
    cy.get('[data-qtag-intervention-header]')
      .should('exist')
      .should('have.text', 'This item is sold by the foot');
    cy.get('[data-qtag-intervention-msg]')
      .should('exist')
      .should('have.text', 'Enter the # of feet');

    if (parseInt(qty) === 0) {
      cy.get(`[data-testid="0"]`).click();
    } else {
      cy.get(`[data-qtag-alpha-key="${qty}"]`).click();
    }
    this.OnScreenKeyEnter.click();
  }
}

export default new Intervention();
