/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import StoreMode from '../../support/pages/storeModePages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import BagPage from '../../support/pages/bagPages';
import TenderPage from '../../support/pages/tenderPages';
import proIDPage from '../../support/pages/proIDPage';
import { CARD_LCC, CARD_TENDER } from '../../support/constants';

const currentDateTime = new Date();
const expireTime = currentDateTime.setMinutes(currentDateTime.getMinutes() + 10);

const proData = {
  expiredQRCode: `{"type":"account","identity":"adsfadfaa-asaa1-asdfafad-1234","org":"c01234132-aaa0b-cca","expire": 1638279868}`,
  invalidQRCode: `{"type":"account","identity":"adsfadfaa-asaa1-asdfafad-1234","or":"c01234132-aaa0b-cca","expire":1661694434}`,
  validQRCode: `{"type":"account","identity":"adsfadfaa-asaa1-asdfafad-1234","org":"c01234132-aaa0b-cca","expire": ${expireTime}}`
};

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

When('Enter the Login Credentials', () => {
  StoreSignIn.stubbedLoginViaCredentials();
});

Then('Verify if user is on start scanning page', () => {
  StoreSignIn.connectingToHardware_spinnerMessage.should('be.visible');
  StoreSignIn.startScanning_screen.should('contain.text', 'Start Scanning').should('exist');
});

When('The user scans valid pro Id QR code', () => {
  cy.scan(`^${proData.validQRCode}[114q`);
});

When('Verify if user is on item entry page', () => {
  ItemEntry.itemEntryMenu.should('be.visible');
});

Then(
  'Verify if {string} toast message and {string} text is displayed on screen',
  (proToastMessage, proText) => {
    proIDPage.validateProIDScanSuccess(proToastMessage, proText);
  }
);

When('The user scans invalid pro ID QR code', () => {
  ItemEntry.addInvalidItemStub();
  cy.scan(`^${proData.invalidQRCode}[114q`);
});

Given('The user is on Start scanning with Menu page', () => {
  StoreSignIn.startScanning_screen.should('contain.text', 'Start Scanning').click();
  ItemEntry.itemEntryMenu.should('be.visible');
});

And('The user clicks on the Item Entry menu', () => {
  ItemEntry.itemEntryMenu.click();
});

And('Validate the Item Entry Page', () => {
  ItemEntry.validatePage();
});

Then('Display the incorrect barcode scan screen with continue button', () => {
  proIDPage.validateInvalidProIDScanPage();
});

When('User clicks on continue button', () => {
  proIDPage.continueButton.click();
});

When('The user scans expired pro ID QR code', () => {
  cy.scan(`^${proData.expiredQRCode}[114q`);
});

Then(
  'Verify if {string} and {string} messages are displayed on screen',
  (expiredText, tryAgainMessage) => {
    proIDPage.validateExpiredProIDScanPage(expiredText, tryAgainMessage);
  }
);

And('User clicks on got it button', () => {
  proIDPage.gotItButton.click();
});

Then('Verify if {string} message is displayed on screen', (invalidScanMessage) => {
  proIDPage.validateInvalidScanMessage(invalidScanMessage);
});

And('Click on the Store Mode Button in Bottom Left', () => {
  StoreMode.storeModeButton.click();
});

When('Enter the Store Login Credentials', () => {
  StoreSignIn.subbedStoreLoginViaCredentials();
});

And('Validate the StoreMode Page', () => {
  StoreMode.validateStoreModePage();
});

And('Click on exit store mode button in the store mode page', () => {
  StoreSignIn.exitStoreModeButton.should('be.visible').click();
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
  TenderPage.crInterventionStubs();
  datatable.hashes().forEach((element) => {
    BagPage.bagRequired(element.BagQuantity);
  });
});

And('Validate the Tender Page', () => {
  TenderPage.validateTenderPage(CARD_TENDER);
});

And('Authorization Loader get enabled LCC', () => {
  TenderPage.tenderCapture(CARD_LCC);
});

And('Validate tender complete', () => {
  TenderPage.tenderCompleteStub(CARD_LCC);
  TenderPage.tenderPaidViaCard(CARD_LCC);
  TenderPage.tenderRemoved();
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
