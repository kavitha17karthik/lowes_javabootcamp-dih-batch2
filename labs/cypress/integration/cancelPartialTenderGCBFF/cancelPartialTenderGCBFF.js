/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import TenderPage from '../../support/pages/tenderPages';
import Intervention from '../../support/pages/interventionPages';
import CancelPaymentConfirmationPage from '../../support/pages/cancelPaymentConfirmationPage';
import { launchScoApplication } from '../../support/commands';
import { CARD_TENDER, CARD_GIFT, CARD_LAR, CARD_VISA } from '../../support/constants';
const controller = Cypress.env('TAGS');

Given('The user is on MRV sco page', () => {
  ScoLanding.initiateScoEnvironment();
  launchScoApplication(controller);
});

When('User clicks on store sign in button', () => {
  StoreSignIn.signInButton.should('be.visible').click();
});

Then('Verify if user is navigated to the store sign in page', () => {
  StoreSignIn.signInHeader.should('contain.text', 'Store Sign In');
});

When('The user scans valid QR Code', (datatable) => {
  datatable.hashes().forEach((element) => {
    StoreSignIn.userName.should('be.visible').type(element.QRCode);
  });
});

When('Enter the Login Credentials', () => {
  StoreSignIn.stubbedLoginViaCredentials();
});

Then('Verify if user is navigated to start scanning page', () => {
  StoreSignIn.connectingToHardware_spinnerMessage.should('be.visible');
  StoreSignIn.startScanning_screen.should('contain.text', 'Start Scanning').click();
});

When('The User is on Start scanning with Menu page', () => {
  ItemEntry.itemEntryMenu.should('be.visible');
});

And('The user clicks on the Item Entry menu', () => {
  ItemEntry.itemEntryMenu.click();
});

And('Validate the Item Entry Page', () => {
  ItemEntry.validatePage();
});

Then('Click the Valid Item number in touchpad keyboard and Enter', (datatable) => {
  ItemEntry.addSingleItemStub(controller);
  datatable.hashes().forEach((element) => {
    ItemEntry.enterItemAndClickEnter(element.itemNumber);
  });
});

And('Validate the add quantity page with user Message {string}', (userMessage) => {
  ItemEntry.validateAddQuantityPage(userMessage);
});

And('Click the quantity for the Item and Enter', (datatable) => {
  datatable.hashes().forEach((element) => {
    ItemEntry.enterItemQtyAndClickEnter(element.itemQty);
  });
});

And('Validate the item added in the cart', (datatable) => {
  datatable.hashes().forEach((element) => {
    Cart.validateCartPage(element.bffLineNumber);
  });
  Cart.cartItemCount.should('be.visible');
});

Then('Click on the Pay Now button', () => {
  ItemEntry.paymentStartStubsBFF();
  ItemEntry.payNowButton.click();
});

And('Validate the Tender Page', () => {
  TenderPage.tenderPageStubsBFF(CARD_GIFT);
  TenderPage.validateTenderPageDetails(CARD_TENDER);
});

And('Authorization Loader get enabled for GC', () => {
  TenderPage.tenderCapture(CARD_GIFT);
  TenderPage.enterCardNumber(CARD_GIFT);
});

And('TenderPage validation for PartialTender activate Failure', () => {
  TenderPage.partialTenderActivateFailStub(CARD_GIFT);
});

When('Activation Fails', () => {
  TenderPage.tenderPaidViaCard(CARD_GIFT, '5.0', 'tenderPartial');
});
Then('Unknown Error Message page gets displayed', () => {
  Intervention.validateUnknownErrorPage();
});

And('Validate tender activate for partial tender', () => {
  TenderPage.partialTenderStub(CARD_GIFT, controller);
  TenderPage.tenderPaidViaCard(CARD_GIFT, '5.0', 'tenderPartial');
  //Tender removed should not be called..for VISA(partial..decline case)
  TenderPage.tenderRemoved();
});

When('Authorization Loader get enabled for VISA', () => {
  TenderPage.partialTenderStub(CARD_VISA, controller, 'tenderPartial');
  TenderPage.tenderCapture(CARD_VISA);
  TenderPage.signatureRequested();
});

And('Provide the signature from PinPad', () => {
  TenderPage.tenderPaidViaCard(CARD_VISA, '', 'tenderPartial');
  TenderPage.deactiaveFailStub(CARD_VISA, 'tenderPartial');
});

When('Deactivate call Fails', () => {
  //cart4...deactivate..rebate...
  //cart5..cart6..payment end..transation end..register..signal--these things belongs to rebatescreen..check whether it needs to be stubbbed.
  // tenderPages.FinalStubPrintEmail();
});

And('Validate gift card authorization for cancel partial tender', () => {
  TenderPage.tenderPageStubsBFF(CARD_GIFT);
});

When('Authorization Loader get enabled for GC zero', () => {
  TenderPage.tenderCapture(CARD_GIFT);
  TenderPage.enterCardNumber(CARD_GIFT);
});

And('Validate gift card authorization for LAR', () => {
  TenderPage.tenderPageStubsBFF(CARD_LAR, 'TenderPartial');
});

When('Authorization Loader get enabled for LAR', () => {
  TenderPage.tenderCapture(CARD_LAR);
  cy.wait(5000).then(() => {
    TenderPage.clickBackButton();
  });
});

Then('Validate tender page for GC failure', () => {
  TenderPage.partialTenderStub(CARD_GIFT, controller);
  TenderPage.tenderPaidViaCard(CARD_GIFT, '00');
  TenderPage.CancelGiftCardStub(controller, CARD_GIFT);
});

Then('Validate tender page for LAR failure', () => {
  TenderPage.partialTenderStub(CARD_LAR, controller);
  TenderPage.CancelGiftCardStub(controller, CARD_GIFT);
});

When('User clicks on the Cancel Payment button on tender page', () => {
  cy.wait(5000).then(() => {
    TenderPage.clickBackButton();
  });
});

Then('Verify intervention screen', () => {
  Intervention.interventionPageText;
});

When('User scans associate QR code or login using the credentials', () => {
  Intervention.StoreSignInButton.should('be.visible').click();
  StoreSignIn.stubbedLoginViaCredentials();
  TenderPage.cancelPaymentStubsBFF(CARD_GIFT);
});

And('Cancel Payment Success', () => {
  TenderPage.cancelPaymentStubsBFF(CARD_GIFT);
});

And('Click on Cancel Payment button', () => {
  TenderPage.cancelPaymentButton();
  CancelPaymentConfirmationPage.cancelPaymentText.should('be.visible');
  CancelPaymentConfirmationPage.giftCardText.should('be.visible');
});

And('Cancel Payment Fails', () => {
  TenderPage.cancelPaymentAPIFailStubsBFF(CARD_GIFT);
});

Then('Validate Page with Payment Cancellation Failed', () => {
  CancelPaymentConfirmationPage.cancelPaymentText.should('be.visible');
  CancelPaymentConfirmationPage.cancelPaymentDescription.should('be.visible');
  CancelPaymentConfirmationPage.cancelPaymentGotItButton.click();
  TenderPage.tenderRemoved();
});

Then('Validate Tender Page screen with refund amount', () => {
  CancelPaymentConfirmationPage.cancelPaymentText.should('be.visible');
  CancelPaymentConfirmationPage.giftCardText.should('be.visible');
  TenderPage.tenderRemoved();
});
