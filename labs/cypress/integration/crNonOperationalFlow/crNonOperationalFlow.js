/// <reference types="cypress"/>
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ScoLanding from '../../support/pages/scoLandingPages';
import StoreSignIn from '../../support/pages/storeSignInPages';
import ItemEntry from '../../support/pages/itemEntryPages';
import Cart from '../../support/pages/cartPages';
import BagPage from '../../support/pages/bagPages';
import TenderPage from '../../support/pages/tenderPages';
import Intervention from '../../support/pages/interventionPages';
import StoreMode from '../../support/pages/storeModePages';
import { CASH_TENDER, CASH_RECYCLER_ERROR_MESSAGE } from '../../support/constants';

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
  TenderPage.crInterventionStubs();
  datatable.hashes().forEach((element) => {
    BagPage.bagRequired(element.BagQuantity);
  });

  Then('Validate if user is able to see {string}', (crMessage) => {
    TenderPage.validateCRNonOperationalPage(crMessage);
  });

  And('Click on No button', () => {
    Intervention.interventionStartStub();
    TenderPage.crNonOperationalPageNoButton();
  });

  Then('Verify intervention screen', () => {
    Intervention.interventionPageText;
  });

  When('User scans associate QR code or login using the credentials', () => {
    Intervention.StoreSignInButton.should('be.visible').click();
    StoreSignIn.stubbedLoginViaCredentials();
  });

  Then('Validate the payment device error page', () => {
    Intervention.validatePaymentDeviceErrorPage();
  });

  Then('Verify and click Suspend sale button displayed on the screen', () => {
    Intervention.crNonOperationalSuspendSaleStubs();
    Intervention.suspendSaleButton.should('be.visible').click();
  });

  And('Verify and click on the View Cart button displayed on the screen', () => {
    Intervention.viewCartFlowStubs();
    Intervention.viewCartButton.should('be.visible').click();
  });

  Then('Validate the start scanning page', () => {
    StoreSignIn.startScanning_screen.should('contain.text', 'Start Scanning');
    StoreSignIn.cardsOnly_startScanningScreen.should('contain.text', 'Cards Only');
  });

  Then('Validate the StoreMode Page', () => {
    StoreSignIn.storeModePage.should('contain.text', 'Store Mode');
  });

  And('Click on exit store mode button in the store mode page', () => {
    StoreSignIn.exitStoreModeButton.should('be.visible').click();
  });

  Then('Validate the store Mode button in the cart page', () => {
    StoreMode.storeModeButton;
  });

  Then('Validate and click on Enter in the bag page', () => {
    BagPage.validateBagPage();
    BagPage.enterButton.click();
  });

  And('Click on the clear cart button in store mode', () => {
    StoreSignIn.clearCartButton.should('be.visible').click();
  });

  And('Validate the clear cart confirmation page', () => {
    StoreSignIn.clearCartConfirmationMessage.should('be.visible');
  });

  And('Click on yes button', () => {
    Cart.crNonOperationalClearCartStubs();
    cy.contains('Yes').should('be.visible').click();
  });

  And('Validate the pheripheral banner error message', () => {
    StoreSignIn.crErrorBannerMessage.should('contain.text', CASH_RECYCLER_ERROR_MESSAGE);
  });
});
