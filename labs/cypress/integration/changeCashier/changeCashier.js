/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ChangeCashierPage from '../../support/pages/changeCashierPages';
import CashierTools from '../../support/pages/cashierToolsPages';
import StoreMode from '../../support/pages/storeModePages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Intervention from '../../support/pages/interventionPages';
import Cart from '../../support/pages/cartPages';
import BagPage from '../../support/pages/bagPages';
import TenderPage from '../../support/pages/tenderPages';
import { CARD_TENDER, HARD_STOP_ITEM_INTERVENTION_MESSAGE } from '../../support/constants';

Given('The user is on MRV sco page', () => {
  ScoLanding.initiateScoEnvironment();
  cy.loadApplication({ enableChangeCashier: true });
  StoreSignIn.initiateLoginStubs();
});

When('User clicks on store sign in button', () => {
  StoreSignIn.signInButton.should('be.visible').click();
});

Then('Verify if user is navigated to the store sign in page', () => {
  StoreSignIn.signInHeader.should('contain.text', 'Store Sign In');
});

When('The user scans valid QR Code', () => {
  StoreSignIn.stubbedLoginViaQRCode();
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

And('Click on the Store Mode Button in Bottom Left', () => {
  StoreMode.storeModeButton.click();
});

Then('Verify if user is navigated to the store sign in page', () => {
  StoreSignIn.signInHeader.should('contain.text', 'Store Sign In');
});

When('Enter the Store Login Credentials', () => {
  StoreSignIn.subbedStoreLoginViaCredentials();
});

And('Validate the StoreMode Page', () => {
  StoreMode.validateStoreModePage();
});

And('The user clicks on the Cashier Tools menu', () => {
  CashierTools.cashierToolsButton.click();
});

And('Validate the Cashier Tools Page', () => {
  CashierTools.validateCashierToolsPage();
});

And('Validate the current cashier name is not change {string}', (currentCashierName) => {
  CashierTools.validateCurrentCashierName(currentCashierName);
});

Then('The user Click the Change Cashier Menu', () => {
  CashierTools.changeCashierButton.click();
});

And('Validate the Change Cashier Page', () => {
  ChangeCashierPage.validateChangeCashierPage();
});

Then('scan the QR code to change the cashier name', () => {
  ChangeCashierPage.scanValidQRCode();
});

Then('Validate the Store Mode Page with updated Toast message', () => {
  ChangeCashierPage.validateToastMessage();
});

And('Click on exit store mode button in the store mode page', () => {
  StoreSignIn.exitStoreModeButton.should('be.visible').click();
});

And('The user clicks on the Item Entry menu', () => {
  ItemEntry.itemEntryMenu.click();
});

And('Validate the Item Entry Page', () => {
  ItemEntry.validatePage();
});

Then('Click the Valid Item number in touchpad keyboard and Enter', (datatable) => {
  ItemEntry.addHighValueItemStub();
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

Then('Click the Hard stop Item number in touchpad keyboard and Enter', (datatable) => {
  ItemEntry.addHardStopItemStub();
  datatable.hashes().forEach((element) => {
    ItemEntry.enterItemAndClickEnter(element.itemNumber);
  });
});

Then('The user will be redirected to Help is on the way page', () => {
  Intervention.validateHelpIsOnTheWayPage(HARD_STOP_ITEM_INTERVENTION_MESSAGE);
});

And(
  'Required Store SignIn to verify the Hard Stop Item, So Click on the Store SignIn button',
  () => {
    Intervention.StoreSignInButton.click();
  }
);

When('Enter the Intervention Login Credentials', () => {
  StoreSignIn.subbedStoreLoginViaCredentials();
});

And('Verify if the user navigated to the Item cannot be sold Page', () => {
  Intervention.validateHardStopPage();
});

And('Click Return To Cart button displayed on the screen', () => {
  Intervention.returnToCartButton.should('be.visible').click();
});

Then('Click the Back button from the Item Entry page', () => {
  ItemEntry.clickBackButton();
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
  TenderPage.validateTenderPage(CARD_TENDER);
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

Then('Validate the AddAssociateToWorkFile API call {string}', (associateId) => {
  TenderPage.addAssociateToWorkFile(associateId);
});

And('Validate the Thanks for shopping page', () => {
  TenderPage.validateThankYouMessage();
});

And('Click on the close lane button in store mode', () => {
  StoreMode.closeLaneMenu.click();
});

And('Validate the close lane confirmation page', () => {
  StoreMode.activitiesConfirmationMessage.should('be.visible');
});

And('Click on yes button', () => {
  StoreMode.closeLaneStubs();
  cy.contains('Yes').should('be.visible').click();
});

Then('Validate the Close Lane Page', () => {
  TenderPage.validateCloseLane();
});

Then('scan the QR code which is invalid', () => {
  ChangeCashierPage.scanInValidQRCode();
});

Then('Validate the QR code which is invalid', () => {
  ChangeCashierPage.validateInvalidQRCode();
});
