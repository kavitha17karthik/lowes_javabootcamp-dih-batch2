/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import Intervention from '../../support/pages/interventionPages';
import { REDUCED_ITEM_INTERVENTION_MESSAGE } from '../../support/constants';
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

Then('Click the Item number in touchpad keyboard and Enter', (datatable) => {
  ItemEntry.updateSingleItemQuantityStub(controller);
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

And('Click on the Item to edit the Quantity', () => {
  ItemEntry.editItemQuantity(controller);
  Cart.clickOnCartPageBffLineItem();
});

And('Click the quantity for the Item and Enter with multiple quantity', (datatable) => {
  ItemEntry.updateBffItemMultipleQuantity(controller);
  datatable.hashes().forEach((element) => {
    ItemEntry.enterItemQtyAndClickEnter(element.itemQty);
  });
});

And('Click the quantity for the Item and reduce the quantity', (datatable) => {
  ItemEntry.reduceQuantityStub(controller);
  datatable.hashes().forEach((element) => {
    ItemEntry.enterItemQtyAndClickEnter(element.itemQty);
  });
});

Then('The user will be redirected to Help is on the way page', () => {
  Intervention.validateHelpIsOnTheWayPage(REDUCED_ITEM_INTERVENTION_MESSAGE);
});

And('Required Store SignIn to remove the Item, So Click on the Store SignIn button', () => {
  Intervention.StoreSignInButton.click();
});

Then('Verify if the user navigated to Reduce Item Quantity Page', () => {
  Intervention.validateReduceItemPage(5, 4);
});

And('Click on the Approve New Quantity Button', () => {
  Intervention.ApproveNewQuantiyButton.click();
});

And('Click on the Keep Current Item Quantity Button', () => {
  Intervention.KeepCurrentItemQuantityButton.click();
});

And('Validate the item quantity added in the cart', (datatable) => {
  datatable.hashes().forEach((element) => {
    Cart.validateCartPage(controller === '@BFF' ? element.bfflineNumber : element.lineNumber);
    Cart.validateItemQuantity(element.itemQuantity);
  });
  Cart.cartItemCount.should('be.visible');
});

And('Click on the Store Mode Button in Bottom Left', () => {
  StoreMode.storeModeButton.click();
});

And('Validate the StoreMode Page', () => {
  StoreMode.validateStoreModePage();
});

And('Click on the Exit Store Mode Button in Bottom Left', () => {
  StoreMode.storeModeButton.click();
});
