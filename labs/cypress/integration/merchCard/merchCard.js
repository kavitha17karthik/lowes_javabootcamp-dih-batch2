/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import { launchScoApplication } from '../../support/commands';
import TenderPage from '../../support/pages/tenderPages';
import BagPage from '../../support/pages/bagPages';
import Intervention from '../../support/pages/interventionPages';

import {
  CARD_TENDER,
  CARD_MERCH,
  MERCH_CARD_LICENSE_INTERVENTION_MESSAGE
} from '../../support/constants';

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
  TenderPage.validateTenderPage(CARD_TENDER, CARD_MERCH);
});

And('Authorization Loader get enabled', () => {
  TenderPage.tenderCapture(CARD_MERCH);
});

Then('Enter PIN Number', () => {
  TenderPage.enterCardNumber(CARD_MERCH);
});

Then('The user will be redirected to Help is on the way page', () => {
  Intervention.validateHelpIsOnTheWayPage(MERCH_CARD_LICENSE_INTERVENTION_MESSAGE, 'barcode');
});

When('User scans associate barcode or login using the credentials', () => {
  Intervention.StoreSignInButton.should('be.visible').click();
  StoreSignIn.stubbedLoginViaCredentials();
});

Then('Verify MerchCard intervention screen', () => {
  Intervention.validateMerchCardVerificationPage;
});

And('Enter Customer DL Number', () => {
  StoreSignIn.enterDLCardNumber(CARD_MERCH);
});

And('Validate tender complete', () => {
  TenderPage.tenderSaleCompleteStub(CARD_MERCH);
  TenderPage.tenderPaidViaCard(CARD_MERCH);
  TenderPage.tenderRemoved();
});
Then('Validate the Select the Print option page', () => {
  TenderPage.validatePrintOptionPage();
});

And('Click on the Print button', () => {
  TenderPage.receiptSelection();
  TenderPage.printReceipt();
  TenderPage.receiptPrintStub();
});

And('Validate the Thanks for shopping page', () => {
  TenderPage.validateThankYouMessage();
});
