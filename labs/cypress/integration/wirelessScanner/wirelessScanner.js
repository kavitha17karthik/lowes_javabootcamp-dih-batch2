/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { launchScoApplication } from '../../support/commands';
import { CASH_SHORTAGE, WIRELESS_SCANNER } from '../../support/constants';
import ItemEntry from '../../support/pages/itemEntryPages';
import scoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import BagPage from '../../support/pages/bagPages';
import TenderPage from '../../support/pages/tenderPages';
import interventionPages from '../../support/pages/interventionPages';
const controller = Cypress.env('TAGS');

Given('The user is on MRV sco page', () => {
  scoLanding.initiateScoEnvironment();
  launchScoApplication(controller);
});

When('User clicks on store sign in button', () => {
  StoreSignIn.signInButton.should('be.visible').click();
});

Then('Enter the Login Credentials', () => {
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

Then('Enter the Valid Item number in touchpad keyboard and Enter', (datatable) => {
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

Then('Click on the Pay Now button', () => {
  ItemEntry.paymentStartStubs();
  scoLanding.getRegisterResponse(WIRELESS_SCANNER);
  ItemEntry.payNowButton.click();
});

Then('Enter the Bag quantity using touchpad and Click Enter', (datatable) => {
  TenderPage.tenderPageStubsCommon();
  datatable.hashes().forEach((element) => {
    BagPage.bagRequired(element.BagQuantity);
  });
});

Then('Validate the customer information on wireless scanner', () => {
  scoLanding.getRegisterResponse(CASH_SHORTAGE);
  TenderPage.validateWirelessScannerPage();
});

And('Click on the Continue button', () => {
  interventionPages.ApproveNewQuantiyButton.click();
});

Then('Click cancel button on scanner not placed screen', () => {
  TenderPage.clickBackButton();
});

Then('validate cancel button click on scanner not placed screen', () => {
  interventionPages.StoreSignInButton.should('be.visible').click();
  StoreSignIn.stubbedLoginViaCredentials();
  TenderPage.validateWirelessScannerPage(true);
});

And('Click continue button with error', () => {
  scoLanding.getRegisterResponse(WIRELESS_SCANNER);
  interventionPages.ApproveNewQuantiyButton.click();
  TenderPage.validateDeclinedBanner();
  interventionPages.ApproveNewQuantiyButton.click();
});
