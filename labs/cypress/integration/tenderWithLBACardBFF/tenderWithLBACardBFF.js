/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import TenderPage from '../../support/pages/tenderPages';
import InterventionPages from '../../support/pages/interventionPages';
import { launchScoApplication } from '../../support/commands';
import { CARD_LBA, CARD_TENDER } from '../../support/constants';

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
  TenderPage.validateTenderPageDetails(CARD_TENDER);
});

And('Authorization Loader get enabled LBA', () => {
  TenderPage.tenderPageStubsBFF(CARD_LBA);
  TenderPage.tenderCapture(CARD_LBA);
});

When('The user enters correct last four digits of card', () => {
  TenderPage.enterCardNumber(CARD_LBA);
});

And('Validate Processing screen', () => {
  TenderPage.validateProcessingTransitionMessage();
});

And('Validate tender complete', () => {
  TenderPage.tenderPaidViaCard(CARD_LBA);
});

Then('Validate the Select the Print option page', () => {
  TenderPage.validatePrintOptionPage();
});

And('Click on the Print button', () => {
  TenderPage.printReceipt();
  TenderPage.receiptPrintStub(controller);
});

And('Validate the Thanks for shopping page', () => {
  TenderPage.validateThankYouMessage();
});

And('Authorization Loader get enabled failed to approve', () => {
  TenderPage.failedActivation(controller, CARD_LBA);
  TenderPage.tenderCapture(CARD_LBA);
});

And('Intervention page loaded with Unknown Error Message', () => {
  InterventionPages.validateUnknownErrorPage();
});
