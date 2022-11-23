/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import attachCustomerLookup from '../../support/pages/attachCustomerLookup';
import Intervention from '../../support/pages/interventionPages';
import BagPage from '../../support/pages/bagPages';
import TenderPage from '../../support/pages/tenderPages';
import PhotoIdScanPage from '../../support/pages/photoIdScanPage';
import { CASH_TENDER } from '../../support/constants';
import cartPages from '../../support/pages/cartPages';

const photoScanData = {
  mismatchDLCode: `@ANSI 6360050101DL00300201DLDAQ102245737DAASAMPLE,DRIVER,CREDENTIAL,DAG 1500 PARK STDAICOLUMBIADAJSCDAK292012731 DARD DAS DAT DAU600DAW200DAY DAZ DBA20190928DBB19780928DBC1DBD20091026DBG2DBH1`,
  validDLCode: `@ANSI 6360050101DL00300201DLDAQ102245737DAAHARPER,RALPH,DAG 140 LEGACY VILLAGE BLVDDAIMOORESVILLEDAJNCDAK292012731 DARD DAS DAT DAU600DAW200DAY DAZ DBA20190928DBB19780928DBC1DBD20091026DBG2DBH1`,
  invalidDLCode: `^_QR_qQ42d7NQxqDoQLFqozUzT4/fqxMS3YiP17c/BbjmAfQ=[114q`
};

Given('The user is on omnia sco page', () => {
  const config = {
    enableDLScan: true
  };
  ScoLanding.initiateScoEnvironment(CASH_TENDER);
  cy.loadApplication(config);
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
  console.log(ItemEntry.itemEntryInputField);
  ItemEntry.validatePage(ItemEntry.itemEntryInputField);
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

Given('The user clicks on the Military Discount menu', () => {
  attachCustomerLookup.militaryDiscountMenu.click();
});

And('Validate the Military Discount Page', () => {
  attachCustomerLookup.validateMilitaryLookupPage();
});

Then('Search for military lookup number in touchpad keyboard', (datatable) => {
  datatable.hashes().forEach((element) => {
    attachCustomerLookup.customerLookupStub(element.customerType);
    ItemEntry.enterItemAndClickEnter(element.militaryNumber, 'Military');
  });
});

And('Validate no results found', () => {
  attachCustomerLookup.noResultsFound.should('be.visible').should('have.text', 'No results found.');
});

Given('The user clears the value from field', () => {
  ItemEntry.clearButton();
});

And('Validate verfied customer', () => {
  attachCustomerLookup.validateVerifiedCustomer();
});

Then('Select the customer radio button', () => {
  attachCustomerLookup.radioButton();
});

And('Click on Apply button', () => {
  attachCustomerLookup.applyButton();
});

Then('Verify Photo Id scan prompt screen', () => {
  PhotoIdScanPage.validatePage();
});

When('The user scans valid DL', () => {
  cy.scan(`^${photoScanData.validDLCode}[114q`);
});

When('The user scans invalid DL', () => {
  cy.scan(`^${photoScanData.invalidDLCode}[114q`);
});

Then('Verify if {string} message is displayed on screen for invalid scan', (invalidScanMessage) => {
  PhotoIdScanPage.validateInvalidScanMessage(invalidScanMessage);
});

When('The user scans valid DL but doesnot match ID', () => {
  cy.scan(`^${photoScanData.mismatchDLCode}[114q`);
});

Then('Verify if {string} message is displayed on screen', (tryAgainMessage) => {
  PhotoIdScanPage.validateDLScanMismatchEMessage(tryAgainMessage);
});

When('The user click the Help button', () => {
  PhotoIdScanPage.helpButton.click();
});

Then('Verify intervention screen', () => {
  Intervention.interventionPageText;
  Intervention.validateHelpIsOnTheWayPage('Please have your photo ID ready.', 'barcode');
});

When('User scans associate barcode or login using the credentials', () => {
  Intervention.StoreSignInButton.should('be.visible').click();
  StoreSignIn.stubbedLoginViaCredentials();
});

Then('Validate the customer information page', () => {
  attachCustomerLookup.validatePhotoInfoText();
});

And('Click on yes button', () => {
  attachCustomerLookup.customerYesButton();
});

And('Click on no button', () => {
  attachCustomerLookup.customerNoButton();
});

And('Verify military applied successfully', () => {
  attachCustomerLookup.validateMilitaryAppliedSuccessfully();
});

Then('Click on the Pay Now button', () => {
  ItemEntry.paymentStartStubs();
  ItemEntry.payNowButton.click();
});

And('Validate the Bag page', () => {
  BagPage.validateBagPage();
});

When('User clicks on the back button', () => {
  TenderPage.editCartWorkfileStub();
  TenderPage.clickBackButton();
  TenderPage.tenderRemoved();
});

And('Verify user is on cart page with Pay Now button enabled and click', () => {
  ItemEntry.payNowButton.should('be.visible').click();
});

Then('Click on enter on the bag page', () => {
  BagPage.enterButton.click();
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

And('Validate the thanks for Military shopping page', () => {
  TenderPage.validateMilitaryThankYouMessage();
});

Then('Validate Pay Now button', () => {
  cartPages.payNowButton.should('be.visible').should('have.text', 'Pay Now');
});

When('User clicks Back Button on DL Scan screen', () => {
  ItemEntry.clickBackButton();
});

Then('User lands on Cart View screen', () => {
  ItemEntry.itemEntryMenu.should('be.visible');
});
