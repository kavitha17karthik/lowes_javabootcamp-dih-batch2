/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import BagPage from '../../support/pages/bagPages';
import TenderPage from '../../support/pages/tenderPages';
import { CARD_TENDER, CARD_GIFT, CARD_VISA, CASH_TENDER } from '../../support/constants';

Given('The user is on omnia sco page', () => {
  ScoLanding.initiateScoEnvironment();
  cy.loadApplication();
  StoreSignIn.initiateLoginStubs();
});

Given('The user is on omnia sco page for Split tender', () => {
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
  datatable.hashes().forEach((element) => {
    BagPage.bagRequired(element.BagQuantity);
  });
});

And('Validate the Tender Page GC', () => {
  TenderPage.validateTenderPage(CARD_TENDER, CARD_GIFT);
});

And('Validate the Tender Page for Cash and Card', () => {
  TenderPage.validateTenderPage(CASH_TENDER, CARD_GIFT);
});

And('Validate the Cash Tender Page', () => {
  TenderPage.validateCashTenderPage();
});

And('Validate the card and cash tender', () => {
  TenderPage.cashTenderPageStubs();
});

And('Validate the Tender Page', () => {
  TenderPage.validateTenderPage(CARD_TENDER);
});

And('Authorization Loader get enabled GC', () => {
  TenderPage.tenderCapture(CARD_GIFT);
  TenderPage.enterGiftCardPinNumber('0066');
});

And('Validate gift card authorization for tender complete', () => {
  TenderPage.continueCallsStubGC(CARD_GIFT, 'CompleteContinue');
});

And('Validate gift card authorization for tender start', () => {
  TenderPage.continueCallsStubGC(CARD_GIFT, 'Start');
});

And('Validate tender complete', () => {
  TenderPage.tenderSaleCompleteStub(CARD_GIFT);
  TenderPage.tenderPaidViaCard(CARD_GIFT);
  TenderPage.tenderRemoved();
});

And('Validate tender activate for split tender {string}', (amount) => {
  TenderPage.CancelPartialTenderStubsGC(CARD_GIFT);
  TenderPage.tenderPaidViaCard(CARD_GIFT, amount);
  TenderPage.tenderRemoved();
});

When('User inserts the money in the Cash recycler {string}', (amount) => {
  const cashAmount = amount * 100;
  TenderPage.cashTenderResponseMocked(cashAmount, 111);
  TenderPage.tenderPaid(amount);
});

When('User inserts the money in the Cash recycler for authorized {string}', (amount) => {
  const cashAmount = amount * 100;
  TenderPage.cashTenderResponseMocked(cashAmount, 111, 'tenderStart', 'Authorized');
  TenderPage.tenderPaid(amount);
});

And('Validate cash tender complete', () => {
  TenderPage.tenderSaleCompleteStub();
});

Then('Validate the Amount paid and remaining amount due screen', () => {
  TenderPage.validateRemainingChangeDue();
});

Then('Insert the card in the PED device and enter the Pin number', () => {
  TenderPage.pinRequested();
  TenderPage.validateInstructionTransitionMessage();
});

And('Authorization Loader get enabled', () => {
  TenderPage.tenderCapture();
  TenderPage.validateAuthorizingTransitionMessage();
  TenderPage.signatureRequested();
});

And(
  'Provide the signature from PinPad and enter the remaining amount {string}',
  (remainingAmount) => {
    TenderPage.tenderCompleteStub();
    TenderPage.tenderPaidViaCard(CARD_VISA, remainingAmount);
    TenderPage.tenderRemoved();
  }
);

Then('Validate the Select the Print option page', () => {
  TenderPage.validatePrintOptionPage();
});

And('Click on the Print button', () => {
  TenderPage.printReceipt();
  TenderPage.receiptPrintStub();
});

And('Validate the Thanks for shopping page', () => {
  TenderPage.validateThankYouMessage();
});
