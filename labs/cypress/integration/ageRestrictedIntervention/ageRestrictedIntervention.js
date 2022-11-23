/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import Intervention from '../../support/pages/interventionPages';
import AgeRestrictionIntervention from '../../support/pages/ageRestrictionInterventionPage';
import { bffUrls } from '../../support/bff-urls/bffUrls';
import { launchScoApplication } from '../../support/commands';
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

And('Validate the Item Entry page', () => {
  ItemEntry.validatePage();
});

Then('Click the Valid Item number in touchpad keyboard and Enter', (datatable) => {
  cy.intercept('POST', bffAppUrls.inventoryLookup, {
    fixture: 'inventoryLookUp/bffLookup'
  }).as('Inventory Lookup');
  AgeRestrictionIntervention.ageRestrictedFirstItemStub();
  datatable.hashes().forEach((element) => {
    ItemEntry.enterItemAndClickEnter(element.itemNumber);
  });
});

Then('Verify intervention screen', (datatable) => {
  Intervention.interventionPageText;
  datatable.hashes().forEach((element) => {
    Intervention.validateHelpIsOnTheWayPage(element.interventionMessage);
  });
});

When('User scans associate barcode or login using the credentials', () => {
  Intervention.StoreSignInButton.should('be.visible').click();
  StoreSignIn.stubbedLoginViaCredentials();
});

Then('Verify item confirmation screen', (datatable) => {
  datatable.hashes().forEach((element) => {
    Intervention.itemApprovalMessage
      .should('be.visible')
      .should('have.text', element.itemConfirmationMessage);
  });
});

And('Click on Approve button', (datatable) => {
  AgeRestrictionIntervention.interventionItemApproveStub();
  datatable.hashes().forEach(() => {
    Intervention.approveButton.should('be.visible').click();
  });
});

And('Validate the add quantity page with user Message {string}', (userMessage) => {
  ItemEntry.validateAddQuantityPage(userMessage);
});

And('Click the quantity for the Item and Enter', (datatable) => {
  cy.intercept('POST', `${bffAppUrls.updateLineItem}6978997807505959091`, {
    fixture: 'ageRestrictedIntervention/updateItem'
  }).as('Update Item');
  datatable.hashes().forEach((element) => {
    ItemEntry.enterItemQtyAndClickEnter(element.itemQty);
  });
});

Then('Validate if item is added to cart', (datatable) => {
  datatable.hashes().forEach((element) => {
    Cart.cartItemNumber.should('have.text', element.itemNumber);
  });
});
