/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import { launchScoApplication } from '../../support/commands';
import StoreMode from '../../support/pages/storeModePages';

const controller = Cypress.env('TAGS');
var cartTotalSale;
var storeModeTotalSale;
var cartItemCount;
var storeModeItemCount;

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

When('User Scans the Item Number', (datatable) => {
  ItemEntry.addSingleScanItemStub(controller);
  datatable.hashes().forEach((element) => {
    cy.scan(element.itemNumber);
  });
});

And('The user clicks on the Item Entry menu', () => {
  ItemEntry.itemEntryMenu.click();
});

And('Validate the Item Entry Page', () => {
  ItemEntry.validatePage();
});

Then('Click the Valid Item number in touchpad keyboard and Enter', (datatable) => {
  ItemEntry.addSingleScanItemStub(controller);
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
    Cart.validateCartPage(controller === '@BFF' ? element.bffLineNumber : element.lineNumber);
  });
  Cart.cartItemCount.should('be.visible');
  cy.get('[data-qtag-cart-itemcount]')
    .invoke('text')
    .then((text) => (cartItemCount = text));

  cy.get(`[data-qtag-cartsubtotal]`)
    .invoke('text')
    .then((text) => (cartTotalSale = text));
});

And('When user clicks on line number item & Back button', (datatable) => {
  datatable.hashes().forEach((element) => {
    Cart.validateCartPage(element.lineNumber);
    Cart.getCartPagelineItem(element.lineNumber).click();
    ItemEntry.clickBackButton();
  });
});

And('Login into store mode by Clicking StoreMode button', () => {
  StoreMode.storeModeButton.click();
});

When('Store Login Credentials', () => {
  StoreSignIn.subbedStoreLoginViaCredentials();
});

And('Validate the StoreMode Page', () => {
  StoreMode.validateStoreModeAmountDetails();
  cy.get(`[data-qtag-cartsubtotal]`)
    .invoke('text')
    .then((text) => {
      storeModeTotalSale = text;
      expect(storeModeTotalSale).to.equals(cartTotalSale);
      return;
    });

  cy.get(`[data-qtag-cart-itemcount]`)
    .invoke('text')
    .then((text) => {
      storeModeItemCount = text;
      expect(storeModeItemCount).to.equals(cartItemCount);
      return;
    });
});
