import {
  ADD_TENDER_TO_CART_CONTROLLER_URL,
  CONTINUE_WORKFILE_REG_EXP,
  DP_APPROVE_URL,
  SALE_COMPLETE_URL,
  SAVE_RTS_RESPONSE_AND_SIGNATURE_URL
} from '../apiConfigUrls';
import TenderPage from './tenderPages';
import { getAppConfig } from '../utils';
const { reg } = getAppConfig();

class MerchCardDLScanPage {
  validateMerchCardTender(tenderType, cardType = '') {
    TenderPage.tenderPageStubsCommon();

    const tenderURL = 'addTenderToCartController';
    cy.intercept(ADD_TENDER_TO_CART_CONTROLLER_URL, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/${tenderURL}${cardType}`
    }).as('Add Tender To Cart Controller');
    cy.intercept('POST', `${CONTINUE_WORKFILE_REG_EXP}&deviceName=${reg}&requestId=1&workfile=*`, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/continueDLInfo`
    }).as('continueDLInfo');
  }

  continueCallStubPostDLScan(cardType = '') {
    cy.intercept('POST', `${CONTINUE_WORKFILE_REG_EXP}&deviceName=${reg}&requestId=2&workfile=*`, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/continue`
    }).as('continueInitialize');

    cy.intercept('POST', `${CONTINUE_WORKFILE_REG_EXP}&deviceName=${reg}&workfile=*`, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/continueDataNeeded`
    }).as('continueData Needed MERCH');

    cy.intercept('POST', `${CONTINUE_WORKFILE_REG_EXP}&deviceName=${reg}&requestId=3&workfile=*`, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/tenderCompleteContinue`
    }).as('continueTenderComplete');

    cy.intercept(DP_APPROVE_URL, {
      fixture: ''
    }).as('Approve');

    cy.intercept('POST', SAVE_RTS_RESPONSE_AND_SIGNATURE_URL, {
      fixture: 'tenderType/tenderWithCardPayment/tender/saveRTSResponseAndSignature'
    }).as('Save RTS Response and Signature');

    cy.intercept('POST', SALE_COMPLETE_URL, {
      fixture: 'tenderType/tenderWithCardPayment/tender/saleComplete'
    }).as('saleComplete');
  }

  clickEnter() {
    cy.get('[data-key="Enter"]').click();
  }

  invalidMismatchDLScanByCustomer(errMsg) {
    cy.get('[data-qtag-errorbanner="true"]').should('have.text', errMsg);
  }

  merchCardErrorMessage(errMsg) {
    cy.get('[data-qtag-merchcard-errormsg="true"]').should('have.text', errMsg);
  }

  backToTenderPage() {
    cy.intercept(ADD_TENDER_TO_CART_CONTROLLER_URL, {
      fixture: `tenderType/tenderWithCardPayment/tenderMERCH/addTenderToCartControllerBack`
    }).as('Add Tender To Cart Controller');
  }

  invalidDLScanStub() {
    cy.intercept('POST', `${CONTINUE_WORKFILE_REG_EXP}&deviceName=${reg}&requestId=2&workfile=*`, {
      fixture: `tenderType/tenderWithCardPayment/tenderMERCH/continueDataNeededInvalidMerch`
    }).as('continueData Needed Invalid DL Scan');
  }
}

export default new MerchCardDLScanPage();
