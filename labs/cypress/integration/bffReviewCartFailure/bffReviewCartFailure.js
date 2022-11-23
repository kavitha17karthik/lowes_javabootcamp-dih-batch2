/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import { launchScoApplication } from '../../support/commands';
import { CARBON_URL } from '../../support/apiConfigUrls';
import { bffUrls } from '../../support/bff-urls/bffUrls';
import Intervention from '../../support/pages/interventionPages';

const controller = Cypress.env('TAGS');
const reg = Cypress.env('SCO_REG');
const bffAppUrls = bffUrls(reg);

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
  const fixtureUrl = 'tenderType/tenderWithCardPayment/tender/';
  cy.intercept('GET', `${CARBON_URL}${bffAppUrls.generateInvoice}6339`, {
    fixture: `${fixtureUrl}generateInvoice`
  }).as('GenerateInvoice');
  cy.intercept('GET', `${CARBON_URL}${bffAppUrls.reviewCart}6960209587791152889`, {
    statusCode: 404,
    fixture: `${fixtureUrl}reviewCart`
  }).as('reviewCart');
  cy.intercept('GET', `${CARBON_URL}${bffAppUrls.reviewCart}6960209587791152889`, {
    fixture: `${fixtureUrl}reviewCartSuccess`
  }).as('reviewCartSuccess');
  ItemEntry.payNowButton.click();
});

Then('Verify intervention screen', () => {
  Intervention.validateUnknownErrorPage();
});

And('Click on store sign in', () => {
  cy.get('[data-qtag-signin-btn]').click();
});

And('Verify error screen', () => {
  const fixtureUrl = 'tenderType/tenderWithCardPayment/tender/';
  cy.intercept('DELETE', `${CARBON_URL}${bffAppUrls.cancelCart}6960209587791152889`, {
    fixture: `${fixtureUrl}clearCart`
  }).as('clear_cart');
  cy.get('[data-qtag-intervention-approvalreason]').should(
    'have.text',
    'An unexpected error occurred.'
  );
  cy.get('[data-qtag-intervention-descriptionmsg]').should(
    'have.text',
    'Lane will need to be closed.'
  );
});

And('Click on Close Lane button', () => {
  cy.get('[data-qtag-intervention-approvebtn]')
    .should('be.visible')
    .should('have.text', 'Close Lane')
    .click();
});
