/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import BagPage from '../../support/pages/bagPages';
import TenderPage from '../../support/pages/tenderPages';
import InterventionPages from '../../support/pages/interventionPages';
import LtrFeedbackPage from '../../support/pages/ltrFeedbackPages';
import { ABOVE_FOUR_DOLLARS_ITEM, CARD_TENDER } from '../../support/constants';

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
  ItemEntry.addHighValueItemStub();
  datatable.hashes().forEach((element) => {
    ItemEntry.enterItemAndClickEnter(element.itemNumber);
  });
});

Then(
  'Click the Valid Item number lower than four dollars in touchpad keyboard and Enter',
  (datatable) => {
    ItemEntry.addSingleItemStub();
    datatable.hashes().forEach((element) => {
      ItemEntry.enterItemAndClickEnter(element.itemNumber);
    });
  }
);

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

Then('Apply Employee Discount {string}', (employeeBarcode) => {
  ItemEntry.applyEmployeeDiscountStub();
  cy.scan(employeeBarcode);
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
  TenderPage.validateTenderPage(CARD_TENDER, '', ABOVE_FOUR_DOLLARS_ITEM);
});

And('Validate the Tender Page for items less than four dollars', () => {
  TenderPage.validateTenderPage(CARD_TENDER);
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

And('Authorization Loader get enabled failed to approve', () => {
  TenderPage.failedActivation();
  TenderPage.tenderCapture();
});

And('Intervention page loaded with Unknown Error Message', () => {
  InterventionPages.validateUnknownErrorPage();
});

And('Provide the signature from PinPad', () => {
  TenderPage.tenderCompleteStub();
  TenderPage.tenderPaidViaCard();
  TenderPage.tenderRemoved();
});

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

And('Validate the {string}', () => {
  LtrFeedbackPage.validateFeedbackQuestionaire();
});

Then('Provide the feedback {string}', (feedback) => {
  LtrFeedbackPage.validateAPICall(feedback);
  LtrFeedbackPage.provideFeedback(feedback);
});

And('Validate the customer feedback selection', () => {
  LtrFeedbackPage.validateThanksForFeedback();
});

Then('Skip the feedback', () => {
  LtrFeedbackPage.validateAPICall(0);
});

And('Validate there is no {string}', () => {
  LtrFeedbackPage.validateFeedbackIsDisabled();
});
