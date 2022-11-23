/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import BagPage from '../../support/pages/bagPages';
import TenderPage from '../../support/pages/tenderPages';
import CashManagement from '../../support/pages/cashManagementPages';
import StoreMode from '../../support/pages/storeModePages';
import InterventionPages from '../../support/pages/interventionPages';
import { CASH_TENDER } from '../../support/constants';

Given('The user is on MRV sco page', () => {
  ScoLanding.initiateScoEnvironment(CASH_TENDER);
  const config = {
    enableManualUnlockCollection: true
  };
  cy.loadApplication(config);
  StoreSignIn.initiateLoginStubs(CASH_TENDER);
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
  StoreSignIn.startScanning_screen.should('contain.text', 'Start Scanning');
});

//
Then('Manually unlock the stash - Stash Unlocked', () => {
  CashManagement.stashUnlocked();
  CashManagement.validateStashUnlocked();
});

And('Remove the stash - Stash Removed', () => {
  CashManagement.stashRemoved();
  CashManagement.validateStashRemoved();
});

Then('Lock the collection door - Stash locked', () => {
  CashManagement.stashLocked();
  CashManagement.validateStashLocked();
});

And('Insert the stash - Stash Inserted', () => {
  CashManagement.stashInserted();
});

And('Insert the stash - Stash Inserted With Error', () => {
  CashManagement.stashInsertedError();
});

Then('Verify if user is return to start scanning page', () => {
  StoreSignIn.startScanning_screen.should('contain.text', 'Start Scanning');
});

Then('Validate the Collection door Intervention page', () => {
  CashManagement.validateCollectionDoorIntervention();
});

And('Click on Unlock Collection Door button without store mode', () => {
  CashManagement.clickUnlockCollectionDoor();
});

And('Click on Unlock Collection Door button with store mode', () => {
  CashManagement.clickUnlockCollectionDoor(true);
});

And('Click on the Store Mode Button in Bottom Left', () => {
  StoreMode.storeModeButton.click();
});

And('Validate the StoreMode Page', () => {
  StoreMode.validateStoreModePage(CASH_TENDER);
});

When('The User is on Start scanning with Menu page', () => {
  StoreSignIn.startScanning_screen.should('contain.text', 'Start Scanning').click();
  ItemEntry.itemEntryMenu.should('be.visible');
});

And('The user clicks on the Item Entry menu', () => {
  ItemEntry.itemEntryMenu.click();
});

And('Validate the Item Entry Page', () => {
  ItemEntry.validatePage();
});

Then('verify the user is return to start page', () => {
  ItemEntry.itemEntryMenu.should('be.visible');
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
  TenderPage.tenderPageStubsCommon();
  datatable.hashes().forEach((element) => {
    BagPage.bagRequired(element.BagQuantity);
  });
});

And('Validate the Tender Page', () => {
  TenderPage.validateTenderPage();
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
});

And('Click on the Print button', () => {
  TenderPage.printReceipt();
  TenderPage.receiptPrintStub();
});

And('Validate the Thanks for shopping page', () => {
  TenderPage.validateThankYouMessage();
});
