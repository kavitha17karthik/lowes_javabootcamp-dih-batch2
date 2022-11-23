/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { launchScoApplication } from '../../support/commands';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import BagPage from '../../support/pages/bagPages';
import TenderPage from '../../support/pages/tenderPages';
import PhotoIdScanPage from '../../support/pages/photoIdScanPage';
import { CARD_TENDER, CARD_MERCH } from '../../support/constants';
import MerchCardDLScanPage from '../../support/pages/ MerchCardDLScanPage';
import { DP_SIGNAL_URL } from '../../support/apiConfigUrls';

const photoScanData = {
  mismatchDLCode: `^@ANSI 6360050101DL00300201DLDAQ102245737DAASAMPLE,DRIVER,CREDENTIAL,DAG 1500 PARK STDAICOLUMBIADAJSCDAK292012731 DARD DAS DAT DAU600DAW200DAY DAZ DBA20190928DBB19780928DBC1DBD20091026DBG2DBH1[114q`,
  validDLCode: `^@ANSI 6360050101DL00300201DLDAQ1306620DAALOWMC,DRIVER,CREDENTIAL,DAG 1500 PARK STDAICOLUMBIADAJNCDAK292012731 DARD DAS DAT DAU600DAW200DAY DAZ DBA20190928DBB19780928DBC1DBD20091026DBG2DBH1[114q`,
  invalidDLCode: `^_QR_qQ42d7NQxqDoQLFqozUzT4/fqxMS3YiP17c/BbjmAfQ=[114q`
};
const controller = Cypress.env('TAGS');
const config = {
  enableDLScan: true
};

Given('The user is on MRV sco page', () => {
  ScoLanding.initiateScoEnvironment();
  launchScoApplication(controller, config);
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
});

And('Click PayNow Button', () => {
  ItemEntry.paymentStartStubs();
  ItemEntry.payNowButton.click();
});

And('Validate the Bag page', () => {
  BagPage.validateBagPage();
});

Then('Enter the Bag quantity using touchpad and Click Enter', (datatable) => {
  TenderPage.tenderPageStubsCommon();
  datatable.hashes().forEach((element) => {
    BagPage.bagRequired(element.BagQuantity);
  });
});

And('Validate the Tender Page for MERCH card', () => {
  MerchCardDLScanPage.validateMerchCardTender(CARD_TENDER, CARD_MERCH);
  TenderPage.validateTenderPageDetails(CARD_TENDER);
});

And('Authorization Loader get enabled', () => {
  TenderPage.tenderCapture(CARD_MERCH);
});

Then('Enter PIN Number', () => {
  TenderPage.enterCardNumber(CARD_MERCH);
});

Then('Verify Photo Id scan prompt screen', () => {
  PhotoIdScanPage.validatePage();
});

When('The user scans valid DL', () => {
  MerchCardDLScanPage.continueCallStubPostDLScan(CARD_MERCH);
  cy.scan(photoScanData.validDLCode);
});

And('Validate Select Print Receipt option', () => {
  TenderPage.tenderPaidViaCard(CARD_MERCH);
  TenderPage.tenderRemoved();
  TenderPage.validatePrintOptionPage();
});

When('The user clicks on Help Button', () => {
  cy.get('[data-qtag-help-btn="true"]').should('be.visible').click();
});

Then('Validate intervention screen {string}', (message) => {
  cy.intercept('POST', DP_SIGNAL_URL, {
    fixture: 'devicePlatform/signal'
  }).as('signal');
  cy.get('[data-qtag-intervention-helpmsg="true"]')
    .should('be.visible')
    .should('have.text', message);
});

And('Clicks Store sign in', () => {
  cy.get('[data-qtag-signin-btn="true"]').should('be.visible').click();
});

When('Enter the Login Credentials', () => {
  StoreSignIn.stubbedLoginViaCredentials();
});

Then('Validate Merch Card Intervention In store header message', () => {
  cy.get('[data-qtag-dl-scan-merchcard-headermsg="true"]').should('be.visible');
});

And('Associate enters valid DL number', (datatable) => {
  MerchCardDLScanPage.continueCallStubPostDLScan(CARD_MERCH);
  datatable.hashes().forEach((element) => {
    ItemEntry.enterItemAndClickEnter(element.dlNumber, '', 'merchCardInputField');
  });
  MerchCardDLScanPage.clickEnter();
});

And('Associate does not enter DL number and clicks enter', () => {
  ItemEntry.validateMerchcardInterventionPage();
  cy.get('[data-key="Enter"]').click();
});

Then('Validate error message {string}', (errMsg) => {
  cy.get('[data-qtag-dl-errormsg="true"]').should('have.text', errMsg);
});

And('Associate enters invalid DL number', (datatable) => {
  datatable.hashes().forEach((element) => {
    ItemEntry.enterItemAndClickEnter(element.dlNumber, '', 'merchCardInputField');
  });
  MerchCardDLScanPage.invalidDLScanStub();
  MerchCardDLScanPage.clickEnter();
});

Then('Validate merch card error {string}', (errMsg) => {
  MerchCardDLScanPage.merchCardErrorMessage(errMsg);
});

When('The user scans invalid DL', () => {
  cy.scan(photoScanData.invalidDLCode);
});

Then('Validate invalid DL scan error message {string}', (errMsg) => {
  MerchCardDLScanPage.invalidMismatchDLScanByCustomer(errMsg);
});

When('The user scans mismatch DL', () => {
  cy.scan(photoScanData.mismatchDLCode);
});

Then('Validate invalid DL scan error message {string}', (errMsg) => {
  MerchCardDLScanPage.invalidMismatchDLScanByCustomer(errMsg);
});

When('The user clicks Back button', () => {
  MerchCardDLScanPage.backToTenderPage();
  TenderPage.clickBackButton();
});

Then('Validate Tender Page', () => {
  cy.get('[data-qtag-insertcard-msg]').should('have.text', 'Insert or swipe your card.');
});

When('The Associate clicks Cancel button', () => {
  MerchCardDLScanPage.backToTenderPage();
  cy.get('[data-qtag-cancelbtn="true"]').should('be.visible').click();
});
