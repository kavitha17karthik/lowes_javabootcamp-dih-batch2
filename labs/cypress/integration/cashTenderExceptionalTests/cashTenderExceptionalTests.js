/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import BagPage from '../../support/pages/bagPages';
import TenderPage from '../../support/pages/tenderPages';
import { CASH_TENDER, CASH_RECYCLER_OFFLINE, CARDS_ONLY } from '../../support/constants';

Given('The user is on MRV sco page', () => {
  ScoLanding.initiateScoEnvironment(CASH_RECYCLER_OFFLINE);
  cy.loadApplication();
  StoreSignIn.initiateLoginStubs();
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
});

And('Start screen is seen in {string} mode', (tenderType) => {
  if (tenderType === CARDS_ONLY) {
    ScoLanding.tenderTypeAvailable(tenderType);
  } else {
    ScoLanding.initiateScoEnvironment(CASH_TENDER);
    ScoLanding.bannerCloseButton();
    ScoLanding.tenderTypeAvailable(tenderType);
  }
});

And('Banner message is seen with {string} message', (bannerMessage) => {
  ScoLanding.pheripheralBannerMessage(bannerMessage);
});

When('User connects the Cash recycler and click on cancel button on Banner message', () => {
  ScoLanding.bannerCloseButton();
});

When('The User is on Start scanning with Menu page', () => {
  StoreSignIn.startScanning_screen.should('contain.text', 'Start Scanning').click();
  ItemEntry.itemEntryMenu.should('be.visible');
});

And('The user clicks on the Item Entry menu', () => {
  ItemEntry.itemEntryMenu.click();
});

And('Validate the Item Entry Page', () => {
  ItemEntry.validatePage();
});

Then('Click the Valid Item number in touchpad keyboard and Enter', (datatable) => {
  ItemEntry.addSingleItemStub();
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
    Cart.validateCartPage(element.lineNumber);
  });
  Cart.cartItemCount.should('be.visible');
});

Then('Click on the Pay Now button', () => {
  ItemEntry.paymentStartStubs();
  ItemEntry.payNowButton.click();
});

And('Validate the Bag page', () => {
  BagPage.validateBagPage();
});

Then('Enter the Bag quantity using touchpad and Click Enter', (datatable) => {
  TenderPage.tenderPageStubsCommon();
  datatable.hashes().forEach((element) => {
    BagPage.bagRequired(element.BagQuantity);
  });
});

And('Validate the Tender Page', () => {
  TenderPage.validateCashTenderPage();
});

When('User inserts the money in the Cash recycler {string}', (amount) => {
  // subbed tender responses
  const cashAmount = amount * 100;
  TenderPage.cashTenderResponseMocked(cashAmount, 1752);
  TenderPage.tenderPaid(amount);
});

Then('Validate the Amount paid and change due screen', () => {
  TenderPage.validateChangeDue();
});

And('User pulls out the remaining change from the Cash recycler', () => {
  TenderPage.tenderRemovedCash();
  TenderPage.tenderReturn();
  TenderPage.tenderSaleCompleteStub();
});

Then('Validate the Select the Print option page', () => {
  TenderPage.validatePrintOptionPage();
});

And('Click on the Print button', () => {
  TenderPage.receiptSelection();
  TenderPage.printReceipt();
  TenderPage.receiptPrintStub();
});

And('Validate the Thanks for shopping page', () => {
  TenderPage.validateThankYouMessage();
});
