/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import Intervention from '../../support/pages/interventionPages';
import { CASH_TENDER } from '../../support/constants';

Given('The user is on omnia sco page', () => {
  ScoLanding.initiateScoEnvironment(CASH_TENDER);
  cy.loadApplication();
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
  StoreSignIn.startScanning_screen.should('contain.text', 'Start Scanning').click();
});

When('The User is on Start scanning with Menu page', () => {
  ItemEntry.itemEntryMenu.should('be.visible');
});

Given('The user clicks on the Item Entry menu', () => {
  ItemEntry.itemEntryMenu.click();
});

And('Validate the Item Entry Page', () => {
  ItemEntry.validatePage(ItemEntry.itemEntryInputField);
});

Then('Click the Valid Item number in touchpad keyboard and Enter', (datatable) => {
  datatable.hashes().forEach((element) => {
    Intervention.cartInterventionItemStub(element.itemType);
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
  datatable.hashes().forEach((element) => {
    Intervention.interventionItemApproveStub(element.itemType);
    Intervention.approveButton.should('be.visible').click();
  });
});

Then('Validate if item is added to cart', (datatable) => {
  datatable.hashes().forEach((element) => {
    Cart.cartItemNumber.should('have.text', element.itemNumber);
  });
});

And('Click on return to cart button', () => {
  Intervention.returnToCartButton.should('be.visible').click();
});

Then('Validate if user is navigated back to cart screen', () => {
  ItemEntry.itemEntryMenu.should('be.visible');
});
