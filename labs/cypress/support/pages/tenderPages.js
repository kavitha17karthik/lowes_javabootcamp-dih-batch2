/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable no-empty */
import {
  ADD_TENDER_TO_CART_CONTROLLER_URL,
  CANCEL_WORKFILE_URL,
  CONTINUE_WORKFILE_URL,
  DP_ACTIVATE_URL,
  DP_APPROVE_URL,
  DP_DEACTIVATE_URL,
  DP_INTERVENTION_END_URL,
  DP_INTERVENTION_START_URL,
  DP_PAYMENT_END_URL,
  DP_PAYMENT_ERR_URL,
  DP_PRINT_URL,
  DP_SUSPEND_URL,
  DP_TENDER_RETURN,
  DP_TRANSACTION_ABORT_URL,
  DP_TRANSACTION_END_URL,
  DP_REGISTER_URL,
  FORMAT_RECEIPT_TEMPLATE_URL,
  POST_PROCESS_URL,
  PROCESS_WORKFILE_URL,
  RESET_WORKFILE_URL,
  SALE_COMPLETE_URL,
  TENDER_START_URL,
  SAVE_RTS_RESPONSE_AND_SIGNATURE_URL,
  CONTENTS_WORKFILE_URL,
  EDITCART_WORKFILE_URL,
  DP_SIGNAL_URL,
  CANCEL_TENDER_URL,
  ADD_ASSOCIATEID_TO_WORKFILE_URL,
  PRO_WORKFILE,
  CONTINUE_WORKFILE_REG_EXP,
  CARBON_URL,
  CARBON_APIS
} from '../apiConfigUrls';
import {
  SCAN_ITEM,
  PRICE_REQUIRED_ITEM,
  KEYBOARD_NUMBER_ELEMENTS,
  KEYBOARD_ALPHABET_ELEMENTS,
  CART_ID
} from '../../support/constants';

import { getAppConfig } from '../utils';
let cardDetails = {};
const { reg } = getAppConfig();

import { bffUrls } from '../bff-urls/bffUrls';
const bffAppUrls = bffUrls(reg);

class TenderPage {
  tenderPageStubs(cardType = '', itemPrice = '', rebateitem = '') {
    this.tenderPageStubsCommon(itemPrice, rebateitem);
    const tenderURL =
      itemPrice === PRICE_REQUIRED_ITEM || itemPrice === SCAN_ITEM
        ? `${itemPrice}AddTenderToCartController`
        : 'addTenderToCartController';
    cy.intercept(ADD_TENDER_TO_CART_CONTROLLER_URL, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/${tenderURL}${cardType}`
    }).as('Add Tender To Cart Controller');
    cy.intercept('POST', CONTINUE_WORKFILE_URL, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/continue`
    }).as('Continue');

    if (cardType === 'MERCH') {
      cy.intercept(
        'POST',
        `${CONTINUE_WORKFILE_REG_EXP}&deviceName=${reg}&requestId=3&workfile=*`,
        {
          fixture: `tenderType/tenderWithCardPayment/tender${cardType}/tenderCompleteContinue`
        }
      ).as('continueTenderComplete');

      cy.intercept(
        'POST',
        `${CONTINUE_WORKFILE_REG_EXP}&deviceName=${reg}&requestId=2&workfile=*`,
        {
          fixture: `tenderType/tenderWithCardPayment/tender${cardType}/continue`
        }
      ).as('continueInitialize');

      cy.intercept(
        'POST',
        `${CONTINUE_WORKFILE_REG_EXP}&deviceName=${reg}&requestId=1&workfile=*`,
        {
          fixture: `tenderType/tenderWithCardPayment/tender${cardType}/continueDLInfo`
        }
      ).as('continueDLInfo');

      cy.intercept('POST', `${CONTINUE_WORKFILE_REG_EXP}&deviceName=${reg}&workfile=*`, {
        fixture: `tenderType/tenderWithCardPayment/tender${cardType}/continueDataNeeded`
      }).as('continueData Needed MERCH');
    }
    cy.intercept('POST', DP_APPROVE_URL, {
      fixture: ''
    }).as('Approve');
    cy.intercept('POST', SAVE_RTS_RESPONSE_AND_SIGNATURE_URL, {
      fixture: 'tenderType/tenderWithCardPayment/tender/saveRTSResponseAndSignature'
    }).as('Save RTS Response and Signature');
    cy.intercept('POST', PRO_WORKFILE, {
      fixture: ''
    }).as('Pro Id Workfile');
    cy.intercept(CONTENTS_WORKFILE_URL, {
      fixture: ''
    }).as('Contents WorkFile');
    return;
  }

  partialTenderActivateFailStub(cardType = '') {
    cy.intercept('GET', `${CARBON_URL}${bffAppUrls.reviewCart}${CART_ID}`, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/GCCancelViewCart`
    }).as('PartialTender GetCart');
    cy.intercept('POST', DP_ACTIVATE_URL, {
      statusCode: 400,
      fixture: 'devicePlatform/activateFail'
    }).as('PartialTender ActivateFail');
    cy.intercept('POST', `${CARBON_URL}${bffAppUrls.cancelAuthorization}`, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/cancelAuthPartialActivate`
    }).as('PartialTender CancelAuth');
    cy.intercept('POST', `${CARBON_URL}${bffAppUrls.removePayment}${CART_ID}`, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/removePaymentCart`
    }).as('PartialTender RemovePayment');
    this.stubCommon();
  }
  tenderPageStubsBFF(cardType = '', type = ' ') {
    this.authorizationStubsBFF(cardType);
    cy.intercept('POST', DP_SUSPEND_URL, {
      fixture: 'devicePlatform/suspend'
    }).as('Suspend');
    cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}${CART_ID}`, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/getCart`
    }).as('Get Cart');
    cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.addPayment}${CART_ID}`, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/addPayment`
    }).as('Add Payment');

    if (type === 'TenderPartial' && cardType === 'LAR') {
      cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}${CART_ID}`, {
        fixture: `tenderType/tenderWithCardPayment/tender${cardType}/getCartLAR`
      }).as('LAR Get Cart');
      cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.addPayment}${CART_ID}`, {
        fixture: `tenderType/tenderWithCardPayment/tender${cardType}/addPaymentLAR`
      }).as('LAR Add Payment');
      cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.removePayment}${CART_ID}`, {
        fixture: `tenderType/tenderWithCardPayment/tender${cardType}/removePaymentLAR`
      }).as('LAR Remove Payment');
    }
  }

  authorizationStubsBFF(cardType = '', type = '') {
    cy.intercept('POST', DP_APPROVE_URL, {
      fixture: ''
    }).as('Approve');
    if (cardType === 'VISA' && type === 'tenderPartial') {
      cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.addAuthorization}`, {
        fixture: `tenderType/tenderWithCardPayment/tender${cardType}/partialAuthorization`
      }).as('VISA Partial  Authorization');
    } else {
      cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.addAuthorization}`, {
        fixture: `tenderType/tenderWithCardPayment/tender${cardType}/authorization`
      }).as('Authorization');
    }
  }
  //tenderPartial
  deactiaveFailStub(cardType = '', type = '') {
    if (cardType === 'VISA') {
      if (type === 'tenderPartial') {
        //cart4
        cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}6960209587791152889`, {
          fixture: `tenderType/tenderWithCardPayment/tender${cardType}/partialTender/getCartDeactivate`
        }).as('VISA Deactivate GetCart');
      } else {
        this.cardDeclineStub();
      }
    }
    cy.intercept('POST', DP_DEACTIVATE_URL, {
      statusCode: 400,
      fixture: 'devicePlatform/deactivateFail'
    }).as('CardDecline Deactivate');
  }

  cardDeclineStub() {
    cy.intercept('PUT', DP_PAYMENT_ERR_URL, {
      fixture: ''
    }).as('Payment Error');
    cy.intercept('POST', DP_ACTIVATE_URL, {
      fixture: 'devicePlatform/activate'
    }).as('Activate');
  }

  deactivateStub(cardType = '') {
    cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}${CART_ID}`, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/addPayment`
    }).as('DeactivateGetCart');
    cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.removePayment}${CART_ID}`, {
      fixture: `tenderType/tenderWithCardPayment/tenderVISA/removePayment`
    }).as('DeactivateRemovePayment');
    cy.intercept('POST', DP_APPROVE_URL, {
      fixture: ''
    }).as('Approve');

    this.deactiaveFailStub(cardType);
  }

  FinalStubPrintEmail() {
    //cart5..cart6..payment end..transation end...register..signal

    //transation end

    //paymentend
    //cart6
    //cart5
    cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}6960209587791152889`, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/partialTender/cart5`
    }).as('Get Cart');
    //rebate
  }

  continueCallsStubGC(cardType, action) {
    cy.intercept('POST', CONTINUE_WORKFILE_URL, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/continueDataNeeded`
    }).as('Continue Data Needed GC');
    cy.intercept('POST', CONTINUE_WORKFILE_URL, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/tender${action}`
    }).as('Tender continue');
    this.validateAuthorizingTransitionMessage();
  }

  tenderPageStubsCommon(itemPrice = '', rebateitem = '') {
    let fixtureURL = '';
    let alias = '';
    if (itemPrice) {
      fixtureURL = `${itemPrice}ProcessOrderWorkFile`;
      alias = 'High Value Item Process WorkFile';
    } else if (rebateitem) {
      fixtureURL = 'warrantyProcessWorkfile';
      alias = 'Post Warranty Process WorkFile';
    } else {
      fixtureURL = 'processOrderWorkFile';
      alias = 'Process WorkFile';
    }

    cy.intercept('POST', PROCESS_WORKFILE_URL, {
      fixture: `tenderType/tenderWithCardPayment/tender/${fixtureURL}`
    }).as(alias);
    cy.intercept('POST', DP_ACTIVATE_URL, {
      fixture: 'devicePlatform/activate'
    }).as('Activate');
    cy.intercept('POST', DP_SUSPEND_URL, {
      fixture: 'devicePlatform/suspend'
    }).as('Suspend');
    return;
  }

  crInterventionStubs() {
    cy.intercept('POST', PROCESS_WORKFILE_URL, {
      fixture: 'intervention/processWorkfile'
    }).as('Process WorkFile');
    cy.intercept('POST', DP_ACTIVATE_URL, {
      fixture: 'intervention/activate'
    }).as('Activate');
    cy.intercept(CONTENTS_WORKFILE_URL, {
      fixture: ''
    }).as('Contents WorkFile');
  }

  postPOstubsLAR() {
    cy.intercept('POST', CONTINUE_WORKFILE_URL, {
      fixture: 'tenderType/tenderWithCardPayment/tender/continue'
    }).as('continue');
    cy.intercept('POST', DP_APPROVE_URL, {
      fixture: ''
    }).as('Approve');
  }

  failedActivation(controller = '', cardType = '') {
    if (controller === '@BFF') {
      cy.intercept('POST', DP_SUSPEND_URL, {
        fixture: 'devicePlatform/suspendFail'
      }).as('Suspend failed');
      cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}6960209587791152889`, {
        fixture: `tenderType/tenderWithCardPayment/tender${cardType}/getCart`
      }).as('Get Cart');
      cy.intercept('PUT', DP_INTERVENTION_START_URL, {
        fixture: ''
      }).as('Intervention Start');
    } else {
      cy.intercept('POST', DP_SUSPEND_URL, (req) => {
        req.reply({
          statusCode: 500, // default
          fixture: ''
        });
      }).as('Suspend failed');
      cy.intercept('PUT', DP_INTERVENTION_START_URL, {
        fixture: ''
      }).as('Intervention Start');
      cy.intercept('POST', DP_DEACTIVATE_URL, {
        fixture: 'devicePlatform/activate'
      }).as('FailedDeactivate');
      cy.intercept(CONTENTS_WORKFILE_URL, {
        fixture: ''
      }).as('Contents WorkFile');
    }
  }

  cashTenderResponseMocked(tenderAmount, totalAmount, action, status) {
    const remaining = Number(totalAmount - tenderAmount);
    const amountDue = remaining > 0 ? remaining : 0;
    const change = remaining < 0 ? Math.abs(remaining) : 0;
    const tenderStartResponse = {
      nextAction: action ? action : 'saleComplete',
      status: status ? status : 'TenderCompleted',
      statusDetails: {
        LastTender: {
          TenderType: 'Cash',
          TenderAmt: tenderAmount.toString(),
          CardNbr: '',
          authCd: ''
        },
        Tender: {
          TotalAmount: totalAmount.toString(),
          AmountOwed: amountDue,
          Change: change.toString()
        },
        'Invoice Details': {
          invoiceNumber: '62126'
        }
      }
    };

    cy.intercept('POST', TENDER_START_URL, {
      statusCode: 200,
      body: tenderStartResponse
    }).as('Tender Start');
    this.deactivateResponseMocked(tenderAmount);
    this.tenderReturnMocked(change);
  }

  deactivateResponseMocked(totalPaidInCash) {
    const deactivateMockResponse = {
      paymentModes: [
        {
          paymentMode: 'CASH',
          status: true,
          amount: totalPaidInCash,
          currencyCode: 'USD'
        },
        {
          paymentMode: 'CARD',
          status: true,
          amount: 0,
          currencyCode: 'USD'
        }
      ]
    };
    cy.intercept('POST', DP_DEACTIVATE_URL, {
      statusCode: 200,
      body: deactivateMockResponse
    }).as('ResponseMocked Deactivate');
  }

  tenderReturnMocked(tenderChange) {
    const tenderReturnMockResponse = {
      paymentMode: 'CASH',
      amount: tenderChange,
      currencyCode: 'USD'
    };

    cy.intercept(DP_TENDER_RETURN, {
      statusCode: 202,
      body: tenderReturnMockResponse
    }).as('Tender Return');
  }

  CancelPartialTenderStubsBffGC(cardType, type = '') {
    if (type === 'Initial') {
      cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}${CART_ID}`, {
        fixture: `tenderType/tenderWithCardPayment/tenderGC/getCart3`
      }).as('CART3');
      cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.removePayment}${CART_ID}`, {
        fixture: `tenderType/tenderWithCardPayment/tenderGC/removePaymentCart`
      }).as('Remove Payment CART');
      this.cardDeclineStub();
    } else {
      cy.intercept('POST', DP_SUSPEND_URL, {
        fixture: 'devicePlatform/suspend'
      }).as('Suspend');
      cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.removePayment}${CART_ID}`, {
        fixture: `tenderType/tenderWithCardPayment/tenderGC/removePaymentCart`
      }).as('Remove Payment CART');
      cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}${CART_ID}`, {
        fixture: `tenderType/tenderWithCardPayment/tenderGC/getCart3`
      }).as('CART3');
      cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}${CART_ID}`, {
        fixture: `tenderType/tenderWithCardPayment/tenderGC/getCart1`
      }).as('CART1');
      cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.addPayment}${CART_ID}`, {
        fixture: `tenderType/tenderWithCardPayment/tenderGC/addPaymentCart`
      }).as('Add Payment CART');
      cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}${CART_ID}`, {
        fixture: `tenderType/tenderWithCardPayment/tenderGC/getCart2`
      }).as('CART2');
      cy.intercept('POST', DP_APPROVE_URL, {
        fixture: ''
      }).as('Approve');
      this.cardDeclineStub();
    }
  }

  cashTenderPageStubs() {
    cy.intercept('POST', PROCESS_WORKFILE_URL, {
      fixture: 'tenderType/tenderWithCashPayment/processOrderWorkFile'
    }).as('Process WorkFile');
    cy.intercept('POST', DP_ACTIVATE_URL, {
      fixture: 'tenderType/tenderWithCashPayment/activate'
    }).as('Activate');
    cy.intercept('POST', DP_DEACTIVATE_URL, {
      fixture: 'tenderType/tenderWithCashPayment/deactivate'
    }).as('CashTender Deactivate');
    cy.intercept(DP_TENDER_RETURN, {
      fixture: 'tenderType/tenderWithCashPayment/tenderReturn'
    }).as('Tender Return');
    cy.intercept('PUT', DP_PAYMENT_END_URL, {
      fixture: ''
    }).as('Payment End');
    cy.intercept('POST', SALE_COMPLETE_URL, {
      fixture: 'tenderType/tenderWithCardPayment/tender/saleComplete'
    }).as('saleComplete');
  }

  tenderCompleteStub(cardType = '') {
    cy.intercept('POST', CONTINUE_WORKFILE_URL, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/tenderCompleteContinue${cardType}`
    }).as('Tender Complete Continue');
    this.tenderSaleCompleteStub(cardType);
  }

  tenderSaleCompleteStub(cardType = '') {
    if (cardType === 'LBA') {
      cy.intercept('POST', SALE_COMPLETE_URL, {
        fixture: `tenderType/tenderWithCardPayment/tender${cardType}/saleComplete${cardType}`
      }).as(`saleComplete${cardType}`);
    } else {
      cy.intercept('POST', SALE_COMPLETE_URL, {
        fixture: 'tenderType/tenderWithCardPayment/tender/saleComplete'
      }).as('saleComplete');
    }
  }

  stubPO() {
    cy.intercept('POST', SALE_COMPLETE_URL, {
      fixture: 'tenderType/tenderWithCardPayment/tender/saleComplete'
    }).as('saleComplete');
  }

  receiptSelection() {
    cy.intercept('POST', CONTINUE_WORKFILE_URL, {
      fixture: 'tenderType/tenderWithCardPayment/tender/printReceipt'
    });
  }

  emailAndPrintSelectionStub() {
    cy.intercept('POST', CONTINUE_WORKFILE_URL, {
      fixture: 'tenderType/tenderWithCardPayment/tender/emailAndPrintReceipt'
    }).as('Email & Print Selection');
  }

  addAssociateToWorkFile(associateId) {
    cy.intercept(ADD_ASSOCIATEID_TO_WORKFILE_URL, {
      fixture: `tenderType/tenderWithCardPayment/tender/addAssociateId${associateId}/addAssociateIdToWorkfile`
    }).as('addAssociateIdToWorkfile');
    cy.fixture(
      `tenderType/tenderWithCardPayment/tender/addAssociateId${associateId}/addAssociateIdToWorkfile`
    ).then((data) => {
      expect(data.message).to.include(associateId);
    });
  }

  validateAssociateIDToWorkFileAPICall(associateId) {
    cy.intercept('PUT', ADD_ASSOCIATEID_TO_WORKFILE_URL, (req) => {
      expect(req.body.associateId).to.equal(associateId);
    });
  }

  receiptPrintStub() {
    cy.intercept('POST', SALE_COMPLETE_URL, {
      fixture: 'tenderType/tenderWithCardPayment/tender/saleCompleteContinue'
    }).as('Print Receipt Selection');
    cy.intercept('PUT', DP_PAYMENT_END_URL, {
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

  receiptPrintEPPItemStub() {
    cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.rebates}6988693404489546354`, {
      fixture: 'devicePlatform/noRebates'
    }).as('Rebates');
    cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.completeCheckout}6988693404489546354`, {
      fixture: 'devicePlatform/complete'
    }).as('Complete');
    cy.intercept('PUT', DP_PAYMENT_END_URL, {
      fixture: ''
    }).as('Payment End');
    cy.intercept('PUT', DP_PRINT_URL, {
      fixture: 'devicePlatform/printer'
    }).as('Print');
  }

  cancelSaleStubs() {
    cy.intercept(DP_TRANSACTION_ABORT_URL, {
      fixture: ''
    }).as('Transaction Abort');
    cy.intercept(DP_TRANSACTION_END_URL, {
      fixture: ''
    }).as('Transaction End');
    cy.intercept(CANCEL_WORKFILE_URL, {
      fixture: 'removeItem/RemoveSingleItem/cancelWorkFile'
    }).as('Cancel Work File');
    cy.intercept(RESET_WORKFILE_URL, {
      fixture: 'removeItem/RemoveSingleItem/resetWorkFile'
    }).as('Reset Work File');
    cy.intercept(DP_INTERVENTION_END_URL, {
      fixture: ''
    }).as('Intervention End');
    cy.intercept('PUT', DP_PAYMENT_END_URL, {
      fixture: ''
    }).as('Payment End');
    cy.intercept('POST', DP_DEACTIVATE_URL, {
      fixture: 'devicePlatform/activate'
    }).as('Canceltub Deactivate');
    // this.addAssociateToWorkFile();
  }

  editCartWorkfileStub() {
    cy.intercept(EDITCART_WORKFILE_URL, {
      fixture: 'tenderType/tenderWithCashPayment/editCartWorkfile'
    }).as('Edit Cart');
  }

  CancelPartialTenderStubs() {
    cy.intercept(TENDER_START_URL, {
      fixture: 'tenderType/tenderWithCashPayment/cancelPayment/tenderStartWorkFile'
    }).as('Tender Start cancel Payment');
    cy.intercept('POST', DP_SUSPEND_URL, {
      fixture: 'devicePlatform/suspend'
    }).as('Suspend');
    cy.intercept('POST', DP_SIGNAL_URL, {
      fixture: 'devicePlatform/signal'
    }).as('signal');
    cy.intercept(CONTENTS_WORKFILE_URL, {
      fixture: `tenderType/tenderWithCashPayment/cancelPayment/contentsWorkfile`
    }).as('Contents WorkFile');
    cy.intercept(CANCEL_TENDER_URL, {
      fixture: `tenderType/tenderWithCashPayment/cancelPayment/cancelTender`
    }).as('Cancel Tender');
    cy.intercept(DP_TENDER_RETURN, {
      fixture: ''
    }).as('Cancel Tender Return');
  }

  CancelPartialTenderStubsGC(cardType) {
    cy.intercept(TENDER_START_URL, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/cancelPayment/tenderStartWorkFile`
    }).as('Tender Start cancel Payment');
    cy.intercept('POST', DP_SUSPEND_URL, {
      fixture: 'devicePlatform/suspend'
    }).as('Suspend');
    cy.intercept('POST', DP_SIGNAL_URL, {
      fixture: 'devicePlatform/signal'
    }).as('signal');
    cy.intercept(CONTENTS_WORKFILE_URL, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/cancelPayment/contentsWorkfile`
    }).as('Contents WorkFile');
    cy.intercept(CANCEL_TENDER_URL, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/cancelPayment/cancelTender`
    }).as('Cancel Tender');
  }

  cancelPaymentStubs() {
    cy.intercept(PROCESS_WORKFILE_URL, {
      fixture: 'tenderType/tenderWithCashPayment/cancelPayment/processOrderWorkFile'
    }).as('Process order workfile');
    this.commonCancelStub();
  }
  commonCancelStub() {
    cy.intercept('POST', DP_SIGNAL_URL, {
      fixture: 'devicePlatform/signal'
    }).as('signal');
    cy.intercept('POST', DP_ACTIVATE_URL, {
      fixture: 'devicePlatform/activate'
    }).as('Activate');
  }

  cancelPaymentAPIFailStubsBFF(cardType) {
    cy.intercept('POST', DP_DEACTIVATE_URL, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/cancelPayment/deactivateAPIFail`
    }).as('CancelPayFails Deactivate');
    cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.cancelAuthorization}`, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/cancelAuthorizationAPIFail`
    }).as('CancelPayFails CancelAuthorization');
    cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.viewCart}${CART_ID}`, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/GCCancelPaymentFails`
    }).as('CancelPayFail Cart');
    this.commonCancelStub();
  }

  cancelPaymentStubsBFF(cardType) {
    cy.intercept('POST', DP_DEACTIVATE_URL, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/cancelPayment/deactivate`
    }).as('GC Deactivate');
    cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.viewCart}${CART_ID}`, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/GCCancelViewCart`
    }).as('GCCancel View Cart');
    cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.cancelAuthorization}`, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/cancelAuthorization`
    }).as('GC Cancel Authorization');
    cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.removePayment}${CART_ID}`, {
      fixture: `tenderType/tenderWithCardPayment/tender${cardType}/GCCancelRemovePayment`
    }).as('GCCancel RemovePayment');
    cy.intercept('PUT', DP_INTERVENTION_END_URL, {
      fixture: ''
    }).as('Intervention End');
  }

  tenderPageEppItemBffStub(cardType = '', item = '') {
    const fixtureUrl =
      item === 'LPP'
        ? `tenderType/tenderWithCardPayment/tender${cardType}/addPaymentLpp`
        : `tenderType/tenderWithCardPayment/tender${cardType}/addPaymentBff`;
    const fixtureGetCartUrl =
      item === 'LPP'
        ? `tenderType/tenderWithCardPayment/tender${cardType}/getCartLpp`
        : `tenderType/tenderWithCardPayment/tender${cardType}/getCartBff`;
    cy.intercept('POST', DP_SUSPEND_URL, {
      fixture: 'devicePlatform/suspend'
    }).as('Suspend');
    cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}6988693404489546354`, {
      fixture: fixtureGetCartUrl
    }).as('Get Cart');
    cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.addPayment}6988693404489546354`, {
      fixture: fixtureUrl
    }).as('Add Payment');
  }

  validateTenderPage(tenderType, cardType = '', itemPrice = '', rebateitem = '') {
    this.tenderPageStubs(cardType, itemPrice, rebateitem);
    this.validateTenderPageDetails(tenderType);
  }

  validateScanItemTenderPage(tenderType, cardType = '', itemPrice = '') {
    this.tenderPageStubs(cardType, itemPrice);
    this.validateAttentionMessage();
    this.validateTenderPageDetails(tenderType);
  }
  validateAttentionMessage() {
    cy.get('[data-qtag-got-it-button="true"]').click();
  }

  validateTenderPageDetails(tenderType) {
    cy.get('[data-qtag-tender-amountdue-label="true"]').should('contain.text', 'Amount Due:');
    assert.isNotNaN(cy.get('[data-qtag-tender-amountdue]'));
    if (tenderType === 'Card') {
      cy.get('[data-qtag-insertcard-msg]').should('have.text', 'Insert or swipe your card.');
    } else {
      cy.get('[data-qtag-insertcard-msg]').should('have.text', 'Insert cash or use card.');
    }
  }
  validateDeclinedBanner() {
    cy.get('[data-qtag-tender-declinemsg]').should('be.visible');
  }
  CancelGiftCardStub(controller, cardType = '') {
    cy.intercept('PUT', DP_INTERVENTION_START_URL, {
      fixture: ''
    }).as('Intervention Start');
    if (controller === '@BFF') {
      cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}${CART_ID}`, {
        fixture: `tenderType/tenderWithCardPayment/tender${cardType}/getCartAuthAmount`
      }).as('Getcart CancelPayment');
    }
  }
  partialTenderStub(cardType, controller, type = '') {
    if (controller === '@BFF') {
      if (cardType === 'GC') {
        cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}${CART_ID}`, {
          fixture: `tenderType/tenderWithCardPayment/tender${cardType}/getCartAuthAmount`
        }).as('Getcart GCAuthAmount');
        cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.addAuthorization}`, {
          fixture: `tenderType/tenderWithCardPayment/tender${cardType}/authorization`
        }).as('GC Authorization');
      } else if (cardType === 'LAR') {
        cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}${CART_ID}`, {
          fixture: `tenderType/tenderWithCardPayment/tender${cardType}/cancelPayment/getCartPO`
        }).as('POCancel GetCart');
        cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.addPayment}${CART_ID}`, {
          fixture: `tenderType/tenderWithCardPayment/tender${cardType}/cancelPayment/addPaymentPO`
        }).as('POCancel AddPayment');

        cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.removePayment}${CART_ID}`, {
          fixture: `tenderType/tenderWithCardPayment/tender${cardType}/cancelPayment/removePaymentPO`
        }).as('POCancel RemovePayment');
      } else if (cardType === 'VISA') {
        //cart3 -addPayment equal
        cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}${CART_ID}`, {
          fixture: `tenderType/tenderWithCardPayment/tender${cardType}/partialTender/addPayment`
        }).as('VISA Partial GetCartAgain');
        //addpayment
        cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.addPayment}${CART_ID}`, {
          fixture: `tenderType/tenderWithCardPayment/tender${cardType}/partialTender/addPayment`
        }).as('VISA Partial AddPayment');
        //cart2
        cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}${CART_ID}`, {
          fixture: `tenderType/tenderWithCardPayment/tender${cardType}/partialTender/getCart`
        }).as('VISA Partial GetCart');
        //suspend
        cy.intercept('POST', DP_SUSPEND_URL, {
          fixture: 'devicePlatform/suspend'
        }).as('Suspend');
        //authorizationStubBFF...whether to keep it down or up
        this.authorizationStubsBFF(cardType, type);
        return;
      }
    } else if (cardType === 'LAR') {
      cy.intercept(ADD_TENDER_TO_CART_CONTROLLER_URL, {
        fixture: `tenderType/tenderWithCardPayment/tender${cardType}/addTenderToCartController`
      }).as('LAR  Add Tender');
      cy.intercept('POST', DP_SUSPEND_URL, {
        fixture: 'devicePlatform/suspend'
      }).as('Suspend');
    }
    cy.intercept('PUT', DP_PAYMENT_ERR_URL, {
      fixture: ''
    }).as('Payment Error');
    cy.intercept('POST', DP_ACTIVATE_URL, {
      fixture: 'devicePlatform/activate'
    }).as('Activate');
  }

  validateWirelessScannerPage(proceed = false) {
    cy.get('[data-qtag-intervention-approvalreason]').should(
      'contain.text',
      'Place the scanner back on its holder and tap continue.'
    );
    cy.get('[data-qtag-intervention-approvebtn="true"]')
      .should('be.visible')
      .should('have.text', 'Continue');
    if (proceed) {
      cy.get('data-qtag-intervention-approve-secondary-btn="true"]')
        .should('have.text', 'Proceed Without Replacing Scanner')
        .click();
    } else {
      cy.get('[data-qtag-common-backbtn]').should('be.visible');
    }
  }

  validateCashTenderPage() {
    this.cashTenderPageStubs();
    cy.get('[data-qtag-tender-amountdue-label]').should('have.text', 'Amount Due:');
    cy.get('[data-qtag-tender-amountdue]').should('not.be.NaN');
    cy.get('[data-qtag-insertcard-msg]').should('contain.text', 'Insert cash or use card');
    return cy.get('[data-qtag-insertcard-msg]');
  }

  validateInstructionTransitionMessage() {
    cy.get('[data-qtag-transitionmsg="instruction-msg"]').should(
      'have.text',
      'Please follow the instructions on the PIN pad.'
    );
  }

  validateProcessingTransitionMessage() {
    cy.get('[data-qtag-transitionmsg="processing"]').should('have.text', 'Processing');
  }

  validateAuthorizingTransitionMessage() {
    cy.get('[data-qtag-transitionmsg="authorizing"]').should('have.text', 'Authorizing');
  }

  validateBackButtonProcessing() {
    cy.get("[data-qtag-transition='PROCESSING']").should('have.text', 'Processing');
  }

  validatePOAccount() {
    cy.get('[data-qtag="ponumber-header"]').should('have.text', 'Enter a P.O. for this account.');
    cy.get('[data-qtag="ponumber-input-field"]').should('be.visible');
    KEYBOARD_ALPHABET_ELEMENTS.forEach((element) => {
      cy.get(`[data-qtag-alpha-key="${element}"]`).should('be.enabled');
    });
  }

  enterPOAccountAndClickEnter(itemNumber) {
    this.validatePOAccount();
    const item = itemNumber.toString().split('');
    item.forEach((element) => {
      cy.get(`[data-qtag-alpha-key="${element}"]`).click();
    });
    cy.get('[data-key="Enter"]').click();
  }

  validateEasyReturnsPage() {
    cy.get('div[data-qtag-confirmation-text]:first-child').should(
      'have.text',
      'Would you like to provide a phone #'
    );
    cy.get('div[data-qtag-confirmation-text]:last-child').should(
      'have.text',
      'for an easy return?'
    );
    cy.get('[data-qtag-yesbtn]').should('have.text', 'Yes');
    cy.get('[data-qtag-nobtn]').should('have.text', 'No');
  }

  easyReturnNoButtonClick() {
    this.validateEasyReturnsPage();
    cy.get('[data-qtag-nobtn]').should('be.visible').click();
  }

  emailAndPrintClick() {
    cy.get('[data-qtag-receiptoptiontext="Email & Print"]').click();
  }

  validatePrintOptionPage() {
    cy.get('[data-qtag-receiptoptiontext="Print"]').should('be.visible');
    cy.get('[data-qtag-receiptoptiontext="Email & Print"]').should('be.visible');
  }

  printReceipt() {
    cy.get('[data-qtag-receiptoptiontext="Print"]').should('be.visible').click();
  }

  validateThankYouMessage() {
    cy.get('[data-qtag-thankyoumsg="true"]').should('have.text', "Thanks for shopping at Lowe's!");
  }

  validateMilitaryThankYouMessage() {
    cy.get('[data-qtag-thankyoumsg="true"]').should(
      'have.text',
      'Thank you for your military service!'
    );
  }

  validateCloseLane() {
    cy.get('[data-qtag-laneclose-msg1]').should('contain.text', 'Closed for Now');
    cy.get('[data-qtag-laneclose-msg2]').should('contain.text', 'Please try another lane.');
  }

  clickBackButton() {
    cy.get('[data-qtag-common-backbtn]').should('be.visible').click();
  }

  cancelPaymentButton() {
    cy.xpath("//span[text()='Cancel Payment']").should('be.visible').click();
  }

  cancelPaymentDeclinedMessage() {
    cy.get('[data-qtag-tender-declinemsg]').should(
      'contain.text',
      'Previous payment(s) canceled and refund initiated.'
    );
  }

  cardDeclinedMessage() {
    cy.get('[data-qtag-tender-declinemsg]').should(
      'contain.text',
      'Card declined. Please try another credit, debit or gift card.'
    );
  }

  get subTotal() {
    return cy.get('[data-qtag-tender-subtotal]');
  }

  validateChangeDue() {
    // validate change due
    cy.get('[data-qtag-due-amountdue-label]').should('have.text', 'Change Due: ');
    cy.get('[data-qtag-tender-amountdue]').should('not.be.NaN');
    cy.get('[data-qtag-tender-amountpaid]').should('contain.text', 'Amount Paid:');
    cy.get('[data-qtag-tender-amountpaid]').should('not.be.NaN');
    cy.contains('Please take your change.');
  }

  validateRemainingChangeDue() {
    // validate remaining amount
    cy.get('[data-qtag-tender-amountdue-label]').should('have.text', 'Remaining Amount Due:');
    cy.get('[data-qtag-tender-amountdue]').should('not.be.NaN');
    cy.get('[data-qtag-tender-amountpaid]').should('contain.text', 'Amount Paid:');
    cy.get('[data-qtag-tender-amountpaid]').should('not.be.NaN');
  }

  enterPO(PO) {
    if (this.validatePage()) {
      const pin = PO.toString().split('');
      pin.forEach((pinNum) => {
        if (parseInt(pinNum) === 0) {
          cy.get(`[data-testid="0"]`).click();
        } else {
          cy.get(`[data-qtag-alpha-key="${pinNum}"]`).click();
        }
      });
      cy.get('[data-key="Enter"]').click();
    }
  }

  skipPO() {
    cy.wait(2000);
    cy.get('[data-key="Continue"]').click();
  }

  validatePage() {
    cy.get('[data-qtag-optionalpomsg="true"]').should('have.text', 'Enter a PO# (optional).');
    cy.get('[data-testid="Continue"]').should('be.enabled');
    const keys = ['a'];
    keys.forEach((element) => {
      cy.get('[data-qtag-alpha-key="%key%"]'.replace('%key%', element)).should('be.visible');
    });
    return true;
  }

  validateCRNonOperationalPage(crMessage) {
    cy.get('[data-qtag-confirmation-text] ').should('have.text', crMessage);
  }

  crNonOperationalPageNoButton() {
    cy.get('[data-qtag-nobtn] ').should('be.visible').click();
  }

  enterCardNumber(cardType, type = '') {
    if (type === 'Decline') {
      cy.fixture(`tenderType/tenderWithCardPayment/tender${cardType}/cardDetailsFail`).then(
        (cardData) => {
          cardDetails = cardData;
          const pin = cardDetails.number.pin.toString().split('');
          pin.forEach((pinNum) => {
            if (parseInt(pinNum) === 0) {
              cy.get(`[data-testid="0"]`).click();
            } else {
              cy.get(`[data-qtag-alpha-key="${pinNum}"]`).click();
            }
          });
          cy.get('[data-key="Enter"]').click();
          return;
        }
      );
    } else {
      cy.fixture(`tenderType/tenderWithCardPayment/tender${cardType}/cardDetails`).then(
        (cardData) => {
          cardDetails = cardData;
          const pin = cardDetails.number.pin.toString().split('');
          pin.forEach((pinNum) => {
            if (parseInt(pinNum) === 0) {
              cy.get(`[data-testid="0"]`).click();
            } else {
              cy.get(`[data-qtag-alpha-key="${pinNum}"]`).click();
            }
          });
          cy.get('[data-key="Enter"]').click();
          return;
        }
      );
    }
  }

  validateInvalidLBACardNumber() {
    cy.get('[data-qtag-last4-errormsg]>div>p')
      .should('be.visible')
      .should('have.text', 'Invalid entry. Enter the last 4 digits on the card.');
  }

  validateEnterPinNumberPage() {
    cy.get('[data-qtag-last4msg]').should('have.text', 'Enter PIN #.');
    KEYBOARD_NUMBER_ELEMENTS.forEach((element) => {
      cy.get('[data-qtag-alpha-key="%key%"]'.replace('%key%', element)).should('be.visible');
    });
  }

  tenderPaidViaCard(cardType = 'VISA', amount, type = '') {
    if (type != 'tenderPartial') this.cancelSaleStubs();
    cy.wait(3000).then(() => {
      window.socket.tenderPaidViaCard(cardType, amount);
      return cy.wait(2000);
    });
  }

  suspedAPIStub() {
    cy.intercept('POST', DP_SUSPEND_URL, {
      fixture: 'devicePlatform/suspend'
    }).as('Suspend');
    cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}${CART_ID}`, {
      fixture: 'tenderType/tenderWithCardPayment/tender/suspendCart'
    }).as('Susped ViewCart1');
    cy.intercept('POST', `${CARBON_URL}${CARBON_APIS.URLS.addPayment}${CART_ID}`, {
      fixture: 'tenderType/tenderWithCardPayment/tenderVISA/addPayment'
    }).as('Suspend AddPayment Cart');
    cy.intercept('GET', `${CARBON_URL}${CARBON_APIS.URLS.reviewCart}${CART_ID}`, {
      fixture: 'tenderType/tenderWithCardPayment/tenderVISA/getCart'
    }).as('Susped ViewCart2');
  }

  approveFailStub() {
    this.stubCommon();
    cy.intercept('GET', `${CARBON_URL}${bffAppUrls.reviewCart}${CART_ID}`, {
      fixture: `tenderType/tenderWithCardPayment/tenderVISA/getCart`
    }).as('Approve FailCart');
    cy.intercept('POST', DP_APPROVE_URL, {
      statusCode: 400,
      fixture: 'devicePlatform/approveFail'
    }).as('Approve Fail');
  }

  //SK-fixture: `devicePlatform/registerBff`  replaced by fixture: `devicePlatform/register`
  activateAPIStub() {
    cy.intercept('GET', `${CARBON_URL}${bffAppUrls.reviewCart}${CART_ID}`, {
      fixture: `tenderType/tenderWithCardPayment/tender/viewCart`
    }).as('ActivateFail  Cart');
    cy.intercept('GET', DP_REGISTER_URL, {
      fixture: `devicePlatform/register`
    }).as('Register FailCart');
    cy.intercept('POST', DP_ACTIVATE_URL, {
      statusCode: 207,
      fixture: 'devicePlatform/activateFail'
    }).as('Activate Fail');
    this.stubCommon();
  }

  stubCommon() {
    cy.intercept('PUT', DP_INTERVENTION_START_URL, {
      fixture: ''
    }).as('Intervention Start');
    cy.intercept('POST', DP_SIGNAL_URL, {
      fixture: 'devicePlatform/signal'
    }).as('signal');
  }

  tenderStashedSocketError() {
    cy.wait(3000).then(() => {
      window.socket.tenderStashedSocketError('Payment API Error.');
      return cy.wait(2000);
    });
  }
  tenderRemoved() {
    cy.wait(3000).then(() => {
      window.socket.tenderRemoved();
      return cy.wait(2000);
    });
  }

  signatureRequested() {
    cy.wait(3000).then(() => {
      window.socket.signatureRequested();
      return cy.wait(2000);
    });
  }

  tenderCapture(cardType = 'VISA') {
    cy.wait(3000).then(() => {
      window.socket.tenderCapture(cardType);
      return cy.wait(2000);
    });
  }

  pinRequested() {
    cy.wait(3000).then(() => {
      window.socket.pinRequested();
      return cy.wait(2000);
    });
  }
  // Cash
  insertCash(amount = '') {
    cy.wait(3000).then(() => {
      window.socket.insertCash(amount);
      return cy.wait(2000);
    });
  }
  // cash insert
  tenderPaid(amount) {
    cy.wait(3000).then(() => {
      window.socket.tenderPaid(amount);
      return cy.wait(2000);
    });
  }

  tenderRemovedCash() {
    cy.wait(3000).then(() => {
      window.socket.tenderRemovedCash();
      return cy.wait(2000);
    });
  }

  tenderReturn() {
    cy.wait(3000).then(() => {
      window.socket.tenderReturn();
      return cy.wait(2000);
    });
  }
}

export default new TenderPage();
