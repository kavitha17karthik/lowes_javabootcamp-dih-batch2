/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import Intervention from '../../support/pages/interventionPages';

const controller = Cypress.env('TAGS');
let cartTotal;
let cartItemCount;

Given('The user is on MRV sco page', () => {
  ScoLanding.initiateScoEnvironment();
  cy.bffAppLauncher({ enableSoftIntervention: true });
  StoreSignIn.initiateBffLaneOpen();
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

When('Enter {string} item number though manual entry', (itemNumber) => {
  ItemEntry.addSingleScanItemStub(controller);
  ItemEntry.enterItemAndClickEnter(itemNumber);
  ItemEntry.validateAddQuantityPage('How many do you have?');
  ItemEntry.enterItemQtyAndClickEnter(1);
});

Then('Enter a measurement item {string}', (itemNumber) => {
  ItemEntry.itemEntryMenu.click();
  ItemEntry.bffAddRestrictedItem('MEASUREMENT_REQUIRED_ITEM', itemNumber);
  ItemEntry.enterItemAndClickEnter(itemNumber);
});

Then('Enter another measurement item {string}', (itemNumber) => {
  ItemEntry.itemEntryMenu.click();
  ItemEntry.bffAddRestrictedItem('MEASUREMENT_REQUIRED_ITEM', itemNumber);
  ItemEntry.enterItemAndClickEnter(itemNumber);
});

Then('Validate the items added to the cart', (datatable) => {
  datatable.hashes().forEach((element, index) => {
    Cart.validateCartPage(element.bffLineNumber);
    if (index > 0) {
      cy.get(`[data-qtag-cartpage-lineitem="${element.bffLineNumber}"]`).contains(
        'Approval needed'
      );
    }
  });
  Cart.cartItemCount.should('be.visible');
  cy.get('[data-qtag-cart-itemcount]')
    .invoke('text')
    .then((text) => {
      cartItemCount = Number(text.replace(' Items', ''));
    });

  cy.get(`[data-qtag-cartsubtotal]`)
    .invoke('text')
    .then((text) => {
      cartTotal = parseFloat(text.replace('$', ''));
    });
});

And('Select the first item {string} to delete from the cart', (lineNumber) => {
  cy.get(`[data-qtag-cartpage-lineitem=${lineNumber}]`).should('exist').click();
  ItemEntry.removeButton.click();
});

And('Validate remove item confirmation page {string}', (itemNumber) => {
  Cart.validateRemoveItemConfirmation(itemNumber);
});

And('Select No keep item option', () => {
  Cart.removeCancelButton.click();
});

And('Select the first item {string} again to delete from the cart', (lineNumber) => {
  cy.get(`[data-qtag-cartpage-lineitem=${lineNumber}]`).should('exist').click();
  ItemEntry.removeButton.click();
});

And('Validate remove item confirmation page {string}', (itemNumber) => {
  Cart.validateRemoveItemConfirmation(itemNumber);
});

And('Select remove item option', () => {
  ItemEntry.bffRemoveItemStub(12212);
  Cart.removeButton.click();
});

And('Validate item removed from the cart and total price got updated', () => {
  cy.get(`[data-qtag-cartsubtotal]`)
    .invoke('text')
    .then((text) => parseFloat(text.replace('$', '')))
    .should('be.lessThan', parseFloat(cartTotal));

  cy.get(`[data-qtag-cart-itemcount]`)
    .invoke('text')
    .then((text) => Number(text.replace(' Items', '')))
    .should('be.lessThan', Number(cartItemCount));
});

Then('Click the pay now button to proceed to payment screen', () => {
  Cart.payNowButton.click();
});

And('Validate the intervention screen with following restricted items', (datatable) => {
  cy.get('[data-qtag-intervention-helpmsg]').should('have.text', 'Help is on the way.');
  cy.get('[data-qtag-intervention-approvalmsg]').should(
    'have.text',
    'Approval is needed for 3 restricted items'
  );
  datatable.hashes().forEach((element) => {
    cy.get(`[data-testid="${element.itemNumber}"]`).contains(element.warningMsg);
  });
});

Then('Associate scan QR code to logs in', () => {
  Intervention.StoreSignInButton.should('be.visible').click();
  StoreSignIn.stubbedLoginViaQRCode();
});

And('Validate removed item approval and approves it and moves to next screen', () => {
  Intervention.validateRemovedItemStep();
});

And('Validate first measurement required item and entered the no of qty', () => {
  Intervention.validateMeasurementStep(1);
});

And(
  'Validate second measurement require item and enter the no of qty and moves to payment screen',
  () => {
    Intervention.validateMeasurementStep(1);
  }
);
