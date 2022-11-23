import {
  DP_LANE_CLOSE_URL,
  LOGOUT_URL,
  REGISTER_STOP_URL,
  DP_TRANSACTION_ABORT_URL,
  CANCEL_WORKFILE_URL,
  CONTENTS_WORKFILE_URL,
  SAVE_INVOICE_URL,
  DP_TRANSACTION_SUSPEND_URL,
  FORMAT_RECEIPT_TEMPLATE_URL,
  DP_PRINT_URL,
  GENERATE_ASSOCIATE_QR_CODE_URL,
  PRINT_PREVIOUS_RECEIPT_URL,
  CARBON_URL,
  CARBON_APIS,
  LOG_OFF_REPORT_URL
} from '../apiConfigUrls';
import { bffUrls } from '../bff-urls/bffUrls';

const reg = Cypress.env('SCO_REG');
const bffAppUrls = bffUrls(reg);
class StoreMode {
  get storeModeButton() {
    return cy.get('[data-qtag-storemode-btn="true"]').should('be.visible');
  }

  get closeLaneMenu() {
    return cy.get('[data-qtag-menu-close-lane-btn="true"]').should('be.visible');
  }

  get clearCartMenu() {
    return cy.get('[data-qtag-clearcart-btn="true"]').should('be.visible');
  }

  get activitiesConfirmationMessage() {
    return cy.get('[data-qtag-confirmation-text]');
  }

  get activitiesYesButton() {
    return cy.get('[data-qtag-yesbtn="true"]').should('be.visible');
  }

  get activitiesNoButton() {
    return cy.get('[data-qtag-nobtn="true"]').should('be.visible');
  }

  get suspendSaleMenu() {
    return cy.get('[data-qtag-menu-suspendsale-btn="true"]').should('be.visible');
  }

  get printAssociateQRCodeMenu() {
    return cy.get('[data-qtag-menu-print-barcode-btn="true"]').should('be.visible');
  }

  get printLastReceiptMenu() {
    return cy.get('[data-qtag-menu-print-lastreceipt-btn="true"]').should('be.visible');
  }

  get printLogOffReportMenu() {
    return cy.get('[data-qtag-menu-logoff-report-btn="true"]').should('be.visible');
  }

  clearCartStubs(controller) {
    cy.intercept('PUT', DP_TRANSACTION_ABORT_URL, {
      statusCode: 204,
      body: {}
    }).as('Transaction Abort');
    if (controller === '@BFF') {
      cy.intercept('DELETE', `${CARBON_URL}${bffAppUrls.cancelCart}6960209587791152889`, {
        fixture: `storeModeActivities/clearCart/cancelBFFWorkfile`
      }).as('Clear cart');
    } else {
      cy.intercept('POST', CANCEL_WORKFILE_URL, {
        fixture: 'storeModeActivities/clearCart/cancelWorkfile'
      }).as('Clear cart cancel');
    }
  }

  suspendSaleStubs() {
    cy.intercept('PUT', CONTENTS_WORKFILE_URL, {
      fixture: `storeModeActivities/suspendSale/contentsWorkfile`
    }).as('contents workfile');
    cy.intercept('POST', SAVE_INVOICE_URL, {
      fixture: `storeModeActivities/suspendSale/saveInvoice`
    }).as('save invoice');
    cy.intercept(DP_TRANSACTION_SUSPEND_URL, {
      fixture: ''
    }).as('transaction Suspend');
    cy.intercept('POST', FORMAT_RECEIPT_TEMPLATE_URL, {
      fixture: 'storeModeActivities/suspendSale/formatReceiptTemplate'
    }).as('formatReceiptTemplate');
    cy.intercept(DP_PRINT_URL, {
      fixture: 'devicePlatform/printer'
    }).as('printer Print');
  }

  printAssociateQRcodeStubs() {
    cy.intercept('POST', GENERATE_ASSOCIATE_QR_CODE_URL, {
      fixture: '/storeModeActivities/associateQRCode/qrCodeGenerator'
    }).as('associate QR code');
    cy.intercept(DP_PRINT_URL, {
      fixture: 'devicePlatform/printer'
    }).as('printer Print');
  }

  printLastReceiptStubs(controller) {
    if (controller === '@BFF') {
      cy.intercept(DP_PRINT_URL, {
        fixture: 'devicePlatform/printerBFF'
      }).as('printer Print');
    } else {
      cy.intercept('POST', PRINT_PREVIOUS_RECEIPT_URL, {
        fixture: ''
      }).as('print previous receipt');
      cy.intercept('POST', FORMAT_RECEIPT_TEMPLATE_URL, {
        fixture: ''
      }).as('formatReceiptTemplate');
      cy.intercept(DP_PRINT_URL, {
        fixture: 'devicePlatform/printer'
      }).as('printer Print');
    }
  }

  closeLaneStubs(controller) {
    if (controller === '@BFF') {
      cy.intercept('DELETE', `${CARBON_URL}${bffAppUrls.cancelCart}6960209587791152889`, {
        fixture: `storeModeActivities/clearCart/cancelBFFWorkfile`
      }).as('Clear cart');
      cy.intercept('PUT', DP_LANE_CLOSE_URL, {
        statusCode: 204,
        body: {}
      }).as('laneClose');
      cy.intercept('GET', CARBON_APIS.URLS.LOGOUT, {
        statusCode: 200,
        body: {
          status: 'Logout Successful'
        }
      }).as('Logout');
    } else {
      cy.intercept('PUT', DP_LANE_CLOSE_URL, {
        statusCode: 204,
        body: {}
      }).as('laneClose');
      cy.intercept('GET', REGISTER_STOP_URL, {
        statusCode: 200,
        body: {
          statusDetails: {
            msg: 'REGD STOPPED SUCCESSFULLY',
            msgType: 'REGD_STOP_SUCCESS'
          }
        }
      }).as('Register Stop');
      cy.intercept('GET', LOGOUT_URL, {
        statusCode: 200,
        body: {
          status: 'Logout Successful'
        }
      }).as('Logout');
    }
  }

  logOffReportStubs(controller) {
    if (controller === '@BFF') {
      cy.intercept('GET', CARBON_APIS.URLS.LOG_OFF_REPORT, {
        fixture: `storeModeActivities/logOffReport/logOffReportBFFNoSale`
      }).as('Log Off Report');
      cy.intercept(DP_LANE_CLOSE_URL, {
        fixture: ''
      }).as('Lane Close');
      cy.intercept('GET', CARBON_APIS.URLS.REGISTER_STOP, {
        fixture: 'storeModeActivities/logOffReport/registerStop'
      }).as('Register stop');
      cy.intercept('GET', CARBON_APIS.URLS.LOGOUT, {
        fixture: '/storeModeActivities/logOffReport/logoutBFF'
      }).as('Log Off Report');
    } else {
      cy.intercept('GET', LOG_OFF_REPORT_URL, {
        fixture: `/storeModeActivities/logOffReport/logOffReport`
      }).as('Log off');
      this.closeLaneStubs();
    }
  }

  validateStoreModePage() {
    cy.get('[data-qtag-clearcart-btn="true"]').should('be.visible');
    cy.get('[data-qtag-item-lookup-btn="true"]').should('be.visible');
    cy.get('[data-qtag-cash-management-btn="true"]').should('be.visible');
    cy.get('[data-qtag-menu-print-lastreceipt-btn="true"]').should('be.visible');
  }

  validateStoreModeAmountDetails() {
    cy.get('[data-qtag-cart-itemcount="true"]').should('be.visible');
    cy.get('[data-qtag-footer-total-savings="true"]').should('be.visible');
    cy.get('[data-qtag-footer-sub-total="true"]').should('be.visible');
  }
}

export default new StoreMode();
