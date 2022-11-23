/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import StoreMode from '../../support/pages/storeModePages';
import Intervention from '../../support/pages/interventionPages';
import BagPage from '../../support/pages/bagPages';
import TenderPage from '../../support/pages/tenderPages';
import managerPasscode from '../../support/pages/managerPasscodePages';
import {
  CARD_TENDER,
  PRICE_REQUIRED_ITEM,
  INVALID_MANAGER_PASSCODE,
  VALID_MANAGER_PASSCODE
} from '../../support/constants';
const controller = Cypress.env('TAGS');
var updatedSellingPrice;
var lineItemSellingPrice;
var lineItemSP;

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

When('Enter the Login Credentials', () => {
  StoreSignIn.stubbedLoginViaCredentials();
});

Then('Verify if user is navigated to start scanning page', () => {
  StoreSignIn.connectingToHardware_spinnerMessage.should('be.visible');
  StoreSignIn.startScanning_screen.should('contain.text', 'Start Scanning').click();
});

When('User Scans the Item Number', (datatable) => {
  managerPasscode.addSingleItemManagerPriceUnlockStub(controller);
  datatable.hashes().forEach((element) => {
    cy.scan(element.itemScanNumber);
  });
});

And('Validate the item added in the cart', (datatable) => {
  datatable.hashes().forEach((element) => {
    Cart.validateCartPage(element.lineNumber);
  });
  Cart.cartItemCount.should('be.visible');
});

And('Click on the Store Mode Button', () => {
  StoreMode.storeModeButton.click();
});

Then('Verify if user is navigated to the store sign in page', () => {
  StoreSignIn.signInHeader.should('contain.text', 'Store Sign In');
});

When('Enter the Store Login Credentials', () => {
  StoreSignIn.subbedStoreLoginViaCredentials();
});

And('Validate the StoreMode Page', () => {
  StoreMode.validateStoreModePage();
});

And('Clicks on line number item & Validate UpdateItem page', (datatable) => {
  datatable.hashes().forEach((element) => {
    cy.get(`[data-qtag-cartpage-lineitem="${element.lineNumber}"]`).click();
    Cart.validateUpdateItemPage(element.lineNumber);
    cy.get('[data-qtag-cartsubtotal]')
      .invoke('text')
      .then((text) => (lineItemSP = text));
  });
});

Then('Enters Discount value & Click Enter', (datatable) => {
  datatable.hashes().forEach((element) => {
    cy.get('[data-qtag-itemsellingdiscount-input]').click();
    ItemEntry.enterValueAndClickEnter(element.discountValue);
  });
});

Then('Select a Reasoncode for Price change', () => {
  managerPasscode.validatePriceChangeReasonPage();
  managerPasscode.clickSelectRCAdministrative();
  ItemEntry.clickContinueButton();
});

When('Manager Approval Screen is displayed', () => {
  managerPasscode.addManagerPasscodeStub();
  managerPasscode.validateManagerApprovalPage();
  managerPasscode.addManagerPasscodeStub(INVALID_MANAGER_PASSCODE);
  managerPasscode.addManagerPasscodeStub(VALID_MANAGER_PASSCODE);
});

Then('Click on Cancel button', () => {
  managerPasscode.clickManagerApprovalCancel();
});

Then('Scan Manager passcode to Approve the Price change', (datatable) => {
  datatable.hashes().forEach((element) => {
    cy.scanManagerPasscode(element.managerPasscode);
  });
});

Then('Check Updated Price in the CartPage', () => {
  cy.get(`[data-qtag-cartsubtotal]`)
    .invoke('text')
    .then((text) => {
      updatedSellingPrice = text;
      expect(updatedSellingPrice).to.not.equals(lineItemSP);
      return;
    });

  cy.get(`[data-qtag-cartpage-lineitem-aggregatedprice]`)
    .invoke('text')
    .then((text) => {
      lineItemSellingPrice = text;
      expect(lineItemSellingPrice).to.equals(updatedSellingPrice);
      return;
    });
});

//Keep the Item in sale
And('Clicks on line number item & Validate UpdateItem page', (datatable) => {
  datatable.hashes().forEach((element) => {
    cy.get(`[data-qtag-cartpage-lineitem="${element.lineNumber}"]`).click();
    Cart.validateUpdateItemPage(element.lineNumber);
  });
});

When('Click Remove icon on the right top of Update Item Page', () => {
  ItemEntry.clickRemoveIcon();
});

Then('Removed Item Intervention Screen appears', (datatable) => {
  datatable.hashes().forEach((element) => {
    Intervention.itemApprovalMessage
      .should('be.visible')
      .should('have.text', element.confirmationMessage);
  });
});

Then('Click keep Item', () => {
  ItemEntry.clickCancelButton();
});

//Remove Item From sale
And('Clicks on line number item & Validate UpdateItem page', (datatable) => {
  datatable.hashes().forEach((element) => {
    cy.get(`[data-qtag-cartpage-lineitem="${element.lineNumber}"]`).click();
    Cart.validateUpdateItemPage(element.lineNumber);
  });
});

When('Click Remove icon on the right top of Update Item Page', () => {
  ItemEntry.clickRemoveIcon();
});

Then('Removed Item Intervention Screen appears', (datatable) => {
  datatable.hashes().forEach((element) => {
    Intervention.itemApprovalMessage
      .should('be.visible')
      .should('have.text', element.confirmationMessage);
  });
});

Then('Click Remove Item from sale', () => {
  managerPasscode.removeItemFromSaleStub();
  ItemEntry.cancelSaleStubs();
  managerPasscode.validateRemoveItemPage();
  Intervention.RemoveFromSaleButton.click();
});

//price-required item -Cancel
Then('Scan a Price-required Item', (datatable) => {
  managerPasscode.addSingleItemPriceRequiredStub(controller);
  datatable.hashes().forEach((element) => {
    cy.scan(element.itemScanNumber);
  });
});
Then('Price-required Item Intervention Screen appears', (datatable) => {
  datatable.hashes().forEach((element) => {
    Intervention.itemApprovalMessage
      .should('be.visible')
      .should('have.text', element.confirmationMessage);
  });
});

When('Click on Cancel button on Price-required item Screen', () => {
  managerPasscode.addSingleItemPriceReqCancelStub(controller);
  ItemEntry.clickCancelButton();
});

Then('Validate the store Mode button in the cart page', () => {
  StoreMode.storeModeButton;
});

Then('Scan a Price-required Item', (datatable) => {
  managerPasscode.addSingleItemPriceRequiredStub(controller);
  datatable.hashes().forEach((element) => {
    cy.scan(element.itemScanNumber);
  });
});
Then('Price-required Item Intervention Screen appears', (datatable) => {
  datatable.hashes().forEach((element) => {
    Intervention.itemApprovalMessage
      .should('be.visible')
      .should('have.text', element.confirmationMessage);
  });
});

When('Click Enter Price', () => {
  managerPasscode.addManagerPasscodeStub();
  ItemEntry.clickEnterButton();
});

And('Enter Price for an Item & click Enters', (datatable) => {
  datatable.hashes().forEach((element) => {
    cy.get('[data-qtag-item-selling-price-input]').click();
    ItemEntry.enterValueAndClickEnter(element.sellingPrice);
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
  TenderPage.validateTenderPage(CARD_TENDER, '', PRICE_REQUIRED_ITEM);
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
