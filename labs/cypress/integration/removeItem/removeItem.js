/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import Intervention from '../../support/pages/interventionPages';
import { REMOVE_ITEM_INTERVENTION_MESSAGE } from '../../support/constants';
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

Then('Click the Item number in touchpad keyboard and Enter', (datatable) => {
  ItemEntry.addSingleItemStub(controller);
  datatable.hashes().forEach((element) => {
    ItemEntry.enterItemAndClickEnter(element.itemNumber);
  });
});

Then('Click another valid Item number in touchpad keyboard and Enter', (datatable) => {
  ItemEntry.addMultipleItemStub(controller);
  datatable.hashes().forEach((element) => {
    ItemEntry.enterItemAndClickEnter(element.itemNumber);
  });
});

And('Validate the add quantity page with user Message', (datatable) => {
  datatable.hashes().forEach((element) => {
    ItemEntry.validateAddQuantityPage(element.itemQtyUserMessage);
  });
});

And('Click the quantity for the Item and Enter', (datatable) => {
  datatable.hashes().forEach((element) => {
    ItemEntry.enterItemQtyAndClickEnter(element.itemQty);
  });
});

And('Validate the item added in the cart', (datatable) => {
  datatable.hashes().forEach((element) => {
    Cart.validateCartPage(controller === '@BFF' ? element.bfflineNumber : element.lineNumber);
  });
  Cart.cartItemCount.should('be.visible');
});

And('Click on the First Item to edit the Quantity', (datatable) => {
  ItemEntry.removeFirstItemStubs();
  const data = datatable.hashes();
  cy.log(JSON.stringify(data));
  Cart.clickOnBffLineItemWithId(controller === '@BFF' ? data[0].bfflineNumber : data[0].lineNumber);
});

And('Click on the Item to edit the Quantity', () => {
  ItemEntry.removeItemStubs();
  Cart.clickOnCartPageBffLineItem();
});

And('Click the Remove button', () => {
  ItemEntry.cancelSaleStubs();
  ItemEntry.removeButton.click();
});

Then('The user will be redirected to Help is on the way page', () => {
  Intervention.validateHelpIsOnTheWayPage(REMOVE_ITEM_INTERVENTION_MESSAGE);
});

And('Required Store SignIn to remove the Item, So Click on the Store SignIn button', () => {
  Intervention.StoreSignInButton.click();
});

Then('Verify if the user navigated to Removed Item Page', () => {
  Intervention.validateRemovedItemPage();
});

And('Click on the Remove from Sale Button', () => {
  Intervention.RemoveFromSaleButton.click();
});

Then('Connecting to the Hardware page will be loaded', () => {
  StoreSignIn.connectingToHardware_spinnerMessage.should('be.visible');
});

Then('Processing page will be loaded', () => {
  Intervention.processing_spinnerMessage.should('be.visible');
});
