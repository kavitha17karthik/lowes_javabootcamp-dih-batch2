/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import BagPage from '../../support/pages/bagPages';
import TenderPage from '../../support/pages/tenderPages';
import InterventionPages from '../../support/pages/interventionPages';
import Intervention from '../../support/pages/interventionPages';
import { CARD_LBA, CARD_TENDER, ABOVE_FOUR_DOLLARS_ITEM } from '../../support/constants';

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

And('Validate the Item Entry Page', () => {
  ItemEntry.validatePage();
});

Then('Click the Valid Item number in touchpad keyboard and Enter', (datatable) => {
  datatable.hashes().forEach((element) => {
    if (element.itemType === 'highValue') {
      ItemEntry.addHighValueItemStub();
    } else {
      ItemEntry.addSingleItemStub();
    }
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
  TenderPage.validateTenderPage(CARD_TENDER);
});

And('Validate the Tender Page for highValue item', () => {
  TenderPage.validateTenderPage(CARD_TENDER, CARD_LBA, ABOVE_FOUR_DOLLARS_ITEM);
});

And('Authorization Loader get enabled LBA', () => {
  TenderPage.tenderCapture(CARD_LBA);
});

When('The user enters incorrect last four digits of card', () => {
  TenderPage.enterCardNumber(CARD_LBA);
});

Then('Validate invalid last four digits entered error message displayed on screen', () => {
  TenderPage.validateInvalidLBACardNumber();
});

And('Authorization Loader get enabled failed to approve', () => {
  TenderPage.failedActivation();
  TenderPage.tenderCapture(CARD_LBA);
});

And('Intervention page loaded with Unknown Error Message', () => {
  InterventionPages.validateUnknownErrorPage();
});

And('Validate processing screen', () => {
  TenderPage.tenderCompleteStub(CARD_LBA);
  TenderPage.tenderPaidViaCard(CARD_LBA);
});

Then('Complete the tender and PO number', () => {
  TenderPage.tenderRemoved();
  TenderPage.skipPO();
  TenderPage.stubPO();
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
