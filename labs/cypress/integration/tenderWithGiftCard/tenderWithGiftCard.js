/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Intervention from '../../support/pages/interventionPages';
import Cart from '../../support/pages/cartPages';
import BagPage from '../../support/pages/bagPages';
import TenderPage from '../../support/pages/tenderPages';
import CancelPaymentConfirmationPage from '../../support/pages/cancelPaymentConfirmationPage';
import { CARD_TENDER, CARD_GIFT } from '../../support/constants';

Given('The user is on omnia sco page', () => {
  ScoLanding.initiateScoEnvironment();
  cy.loadApplication();
  StoreSignIn.initiateLoginStubs();
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
  ItemEntry.addSingleItemStub();
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
    Cart.validateCartPage(element.lineNumber);
  });
  Cart.cartItemCount.should('be.visible');
});

Then('Click on the Pay Now button', () => {
  ItemEntry.paymentStartStubs();
  ItemEntry.payNowButton.click();
});

And('Validate the Bag page', () => {
  BagPage.validateBagPage();
});

Then('Enter the Bag quantity using touchpad and Click Enter', (datatable) => {
  datatable.hashes().forEach((element) => {
    BagPage.bagRequired(element.BagQuantity);
  });
});

And('Validate the Tender Page GC', () => {
  TenderPage.validateTenderPage(CARD_TENDER, CARD_GIFT);
});

And('Authorization Loader get enabled GC', () => {
  TenderPage.tenderCapture(CARD_GIFT);
  TenderPage.enterCardNumber(CARD_GIFT);
});

And('Validate gift card authorization', () => {
  TenderPage.continueCallsStubGC(CARD_GIFT, 'CompleteContinue');
});

And('Validate gift card authorization for cancel partial tender', () => {
  TenderPage.continueCallsStubGC(CARD_GIFT, 'Start');
});

And('Validate tender complete', () => {
  TenderPage.tenderSaleCompleteStub(CARD_GIFT);
  TenderPage.tenderPaidViaCard(CARD_GIFT);
  TenderPage.tenderRemoved();
});

And('Validate tender activate for partial tender', () => {
  TenderPage.CancelPartialTenderStubsGC(CARD_GIFT);
  TenderPage.tenderPaidViaCard(CARD_GIFT, '50');
  TenderPage.tenderRemoved();
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
});

Then('Validate Cancel Payment screen is displayed with refund cash amount', () => {
  CancelPaymentConfirmationPage.cancelPaymentText.should('be.visible');
  CancelPaymentConfirmationPage.giftCardText.should('be.visible');
});

And('Click on Cancel Payment button', () => {
  TenderPage.cancelPaymentButton();
});

Then('Validate the tender page and tender declined message', () => {
  TenderPage.cancelPaymentStubs();
  cy.wait(3000).then(() => {
    TenderPage.cancelPaymentDeclinedMessage();
    return;
  });
});

Then('Validate the Select the Print option page', () => {
  TenderPage.validatePrintOptionPage();
});

And('Click on the Print button', () => {
  TenderPage.printReceipt();
  TenderPage.receiptPrintStub();
});

And('Validate the Thanks for shopping page', () => {
  TenderPage.validateThankYouMessage();
});
