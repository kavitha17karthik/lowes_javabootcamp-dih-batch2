/// <reference types="cypress"/>
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import TenderPage from '../../support/pages/tenderPages';

Given('The associate is on close lane', () => {
  TenderPage.validateCloseLane();
});

When('Associate sign in into card only register and login fails with sigcap error', () => {
  ScoLanding.initiateScoEnvironment('Card');
  cy.loadApplication();
  StoreSignIn.initiateSigcapErrorStubs();
  StoreSignIn.signInButton.should('be.visible').click();
  StoreSignIn.signInHeader.should('contain.text', 'Store Sign In');
  StoreSignIn.stubbedLoginViaCredentials();
});

Then('Validate the sigcap error message on the screen', () => {
  cy.contains('Can’t connect to Sigcap.');
  cy.contains('Resolve cash recycler errors.').should('not.exist');
  cy.get('button').contains('Close Lane').click();
});

When('Associate sign in into card and cash register and login fails with sigcap error', () => {
  ScoLanding.initiateScoEnvironment('Cash');
  cy.loadApplication();
  StoreSignIn.initiateSigcapErrorStubs();
  StoreSignIn.signInButton.should('be.visible').click();
  StoreSignIn.signInHeader.should('contain.text', 'Store Sign In');
  StoreSignIn.stubbedLoginViaCredentials();
});

Then('Validate the sigcap error and cash recycler error message on the screen', () => {
  cy.contains('Can’t connect to Sigcap.');
  cy.contains('Resolve cash recycler errors.');
});
