/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import TenderPage from '../../support/pages/tenderPages';
import InterventionPages from '../../support/pages/interventionPages';
import { ABOVE_FOUR_DOLLARS_ITEM, CARD_TENDER } from '../../support/constants';
import RebateScreenPage from '../../support/pages/rebateScreenPage';

Given('The user is on MRV sco page', () => {
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
  ItemEntry.addRebateItemStub();
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
  ItemEntry.paymentStartStubs('rebateItem');
  RebateScreenPage.warrantyProcessWorkFileStub();
  ItemEntry.payNowButton.click();
});

Then('Validate the Warranty page {string}', (msg) => {
  RebateScreenPage.validateWarrantyScreen(msg);
});

And('Select any one LPP option', () => {
  RebateScreenPage.selectWarrantyOption();
  RebateScreenPage.applyWarrantyStub();
  RebateScreenPage.clickApply();
});

And('Validate the Tender Page', () => {
  TenderPage.validateTenderPage(CARD_TENDER, '', ABOVE_FOUR_DOLLARS_ITEM, 'rebateitem');
});

Then('Insert the card in the PED device and enter the Pin number', () => {
  TenderPage.pinRequested();
  TenderPage.validateInstructionTransitionMessage();
});

And('Authorization Loader get enabled', () => {
  TenderPage.tenderCapture();
  TenderPage.validateAuthorizingTransitionMessage();
  TenderPage.signatureRequested();
});

And('Authorization Loader get enabled failed to approve', () => {
  TenderPage.failedActivation();
  TenderPage.tenderCapture();
});

And('Intervention page loaded with Unknown Error Message', () => {
  InterventionPages.validateUnknownErrorPage();
});

And('Provide the signature from PinPad', () => {
  TenderPage.tenderCompleteStub();
  TenderPage.tenderPaidViaCard();
  TenderPage.tenderRemoved();
});

Then('Validate the Select the Print option page', () => {
  TenderPage.validatePrintOptionPage();
  TenderPage.printReceipt();
});

And('Click on the Print button', () => {
  RebateScreenPage.printReceiptStub();
});

Then('Validate {string}', (msg) => {
  RebateScreenPage.validateRebateHeader(msg);
});
