/// <reference types="cypress"/>

import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import Intervention from '../../support/pages/interventionPages';
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
  datatable.hashes().forEach((element) => {
    Intervention.cartInterventionItemStubBFF(element.itemType);
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

Then('Verify enter the feet screen', (datatable) => {
  datatable.hashes().forEach((element) => {
    Intervention.validateEnterTheFeetPage(element.pageHeaderMessage);
  });
});

And('Click the number of feet for Item and Enter', (datatable) => {
  datatable.hashes().forEach((element) => {
    ItemEntry.enterItemQtyAndClickEnter(element.itemFeet);
  });
});

And('Validate the item added in the cart', (datatable) => {
  datatable.hashes().forEach((element) => {
    Cart.validateCartPage(element.bffLineNumber);
  });
  Cart.cartItemCount.should('be.visible');
});

Then('Verify item confirmation screen', (datatable) => {
  datatable.hashes().forEach((element) => {
    Intervention.notSoldItemApprovalMessage
      .should('be.visible')
      .should('have.text', element.itemConfirmationMessage);
  });
});

And('Click on return to cart button', () => {
  Intervention.returnToCartButton.should('be.visible').click();
});

Then('Validate if user is navigated back to Item Entry Screen', () => {
  ItemEntry.validatePage();
});
