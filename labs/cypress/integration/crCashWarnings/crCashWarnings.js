/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import BagPage from '../../support/pages/bagPages';
import TenderPage from '../../support/pages/tenderPages';
import { CASH_SHORTAGE, CASH_TENDER } from '../../support/constants';

Given('We are on omnia sco page', () => {
  ScoLanding.initiateScoEnvironment(CASH_TENDER);
  cy.loadApplication();
  StoreSignIn.initiateLoginStubs(CASH_TENDER);
});

When('Associate clicks on the sign button to login', () => {
  StoreSignIn.signInButton.should('be.visible').click();
});

Then('Verify if associate is navigated to the store sign in page', () => {
  StoreSignIn.signInHeader.should('contain.text', 'Store Sign In');
});

When('Associate enters the Login Credentials successfully', () => {
  StoreSignIn.stubbedLoginViaCredentials();
});

Then('Verify hardware check processing', () => {
  StoreSignIn.connectingToHardware_spinnerMessage.should('be.visible');
});

And('The customer is on Start scanning page', () => {
  StoreSignIn.startScanning_screen.contains('Start Scanning').should('exist');
  StoreSignIn.startScanning_screen.click();
});

And('The customer scanned first item', (datatable) => {
  ItemEntry.addSingleItemStub();
  ItemEntry.itemEntryMenu.click();
  datatable.hashes().forEach((element) => {
    ItemEntry.enterItemAndClickEnter(element.itemNumber);
  });
});

And('Validate the add quantity page with user Message {string}', (userMessage) => {
  ItemEntry.validateAddQuantityPage(userMessage);
});

And('Enter item quantity and proceed', (datatable) => {
  datatable.hashes().forEach((element) => {
    ItemEntry.enterItemQtyAndClickEnter(element.itemQty);
  });
});

And('Validate item being added to the cart', (datatable) => {
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

And('Enter the Bag quantity using touch pad and Click Enter and proceed', (datatable) => {
  TenderPage.tenderPageStubsCommon();
  datatable.hashes().forEach((element) => {
    BagPage.bagRequired(element.BagQuantity);
  });
});

And('Validate cash tender page', () => {
  TenderPage.validateCashTenderPage();
});

Then('Enter cash amount {string}', (amount) => {
  // subbed tender responses
  const cashAmount = amount * 100;
  TenderPage.cashTenderResponseMocked(cashAmount, 1752);
  TenderPage.tenderPaid(amount);
});

And('Validate amount entered in tender page', () => {
  TenderPage.validateChangeDue();
  TenderPage.tenderRemovedCash();
  TenderPage.tenderReturn();
  TenderPage.tenderSaleCompleteStub();
});

Then('Validate the receipt option', () => {
  TenderPage.validatePrintOptionPage();
});

And('Select print receipt option', () => {
  TenderPage.receiptSelection();
  TenderPage.printReceipt();
  TenderPage.receiptPrintStub();
  ScoLanding.getRegisterResponse(CASH_SHORTAGE);
});

And('Validate thank you message', () => {
  TenderPage.validateThankYouMessage();
});

Then('Customer is on start scanning again', () => {
  StoreSignIn.startScanning_screen.contains('Start Scanning').should('exist');
});

And('Login into store mode', () => {
  StoreSignIn.storemodeLogin();
});

And('Validate cash shortage warning {string}', (message) => {
  StoreSignIn.crErrorBannerMessage.contains(message).should('exist');
});

Then('Close the first banner', () => {
  StoreSignIn.closeBannerButton.click();
});

And('Validate cash overflow warning {string}', (message) => {
  StoreSignIn.crErrorBannerMessage.contains(message).should('exist');
});

Then('Exist from store mode', () => {
  StoreSignIn.exitStoreModeButton.click();
});
