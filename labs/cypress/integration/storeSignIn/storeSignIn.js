/// <reference types="cypress"/>
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';

Given('The user is on MRV sco page', () => {
  ScoLanding.initiateScoEnvironment();
  cy.loadApplication();
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

When('The user scans invalid QR Code', () => {
  StoreSignIn.stubbedInvalidLogin();
});

Then('Verify the invalid QR code error message', () => {
  StoreSignIn.invalidQRScan_msg.should('contain.text', 'Invalid QR code. Please sign in.');
});
