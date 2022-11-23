/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import StoreMode from '../../support/pages/storeModePages';
import { launchScoApplication } from '../../support/commands';
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

When('The user clicks on the Store Mode Button in Bottom Left', () => {
  StoreMode.storeModeButton.click();
});

And('Enter the Login Credentials and validate the StoreMode page', () => {
  StoreSignIn.stubbedLoginViaCredentials();
  StoreMode.validateStoreModePage();
});

When('The user clicks on the clear cart menu', () => {
  StoreMode.clearCartStubs(controller);
  StoreMode.clearCartMenu.click();
});

When('The user clicks on the close lane menu', () => {
  StoreMode.closeLaneStubs(controller);
  StoreMode.closeLaneMenu.click();
});

When('The user clicks on the print associate QR code menu', () => {
  StoreMode.printAssociateQRcodeStubs();
  StoreMode.printAssociateQRCodeMenu.click();
});

When('The user clicks on the log off menu', () => {
  StoreMode.logOffReportStubs(controller);
  StoreMode.printLogOffReportMenu.click();
});

Then('Validate {string} confirmation page', (confirmationMessage) => {
  StoreMode.activitiesConfirmationMessage.should('contain.text', confirmationMessage);
});

When('The user clicks on the print last receipt menu', () => {
  StoreMode.printLastReceiptStubs(controller);
  StoreMode.printLastReceiptMenu.click();
});

When('User clicks on no button', () => {
  StoreMode.activitiesNoButton.click();
});

Then('Validate store mode page', () => {
  StoreMode.validateStoreModePage();
});

Then('User clicks on yes button', () => {
  StoreMode.activitiesYesButton.click();
});

Then('Verify start scanning page is visible', () => {
  StoreSignIn.startScanning_screen.should('be.visible').should('contain.text', 'Start Scanning');
});

Then('Validate closed for now screen', () => {
  StoreSignIn.laneClosedScreen.should('be.visible').should('have.text', ' Closed for Now');
});
