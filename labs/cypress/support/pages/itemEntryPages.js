import {
  ADDITEM_WORKFILE_URL,
  CANCEL_WORKFILE_URL,
  CARBON_APIS,
  CARBON_URL,
  DP_ACTIVATE_URL,
  DP_INTERVENTION_END_URL,
  DP_INTERVENTION_START_URL,
  DP_PAYMENT_START_URL,
  DP_SIGNAL_URL,
  DP_TRANSACTION_ABORT_URL,
  DP_TRANSACTION_START_URL,
  EDITITEM_WORKFILE_URL,
  GET_RESOURCE_BUNDLE_URL,
  NEW_WORKFILE_URL,
  RESET_WORKFILE_URL
} from '../apiConfigUrls';
import { bffUrls } from '../bff-urls/bffUrls';
import { KEYBOARD_NUMBER_ELEMENTS } from '../../support/constants';

const reg = Cypress.env('SCO_REG');
const bffAppUrls = bffUrls(reg);

class ItemEntry {
  get itemEntryMenu() {
    return cy.get('[data-qtag-menu-itementry-btn="true"]');
  }

  get itemEntryKeyboard() {
    return cy.get('data-qtag-keyboard-alpha="true"');
  }

  get removeButton() {
    return cy.get('[data-qtag-removeitem-btn="true"]');
  }

  get payNowButton() {
    return cy.get('[data-qtag-paynow-btn="true"]');
  }

  get itemEntryErrorMessage() {
    return cy.get('[data-qtag-itementry-errormsg="true"]');
  }

  get cartPageSubTotal() {
    return cy.get('[data-qtag-cartsubtotal]');
  }

  startScanningScreen() {
    cy.get('[data-qtag-startscan-msg="true"]').should('be.visible');
  }

  clickBackButton() {
    cy.get('[data-qtag-common-backbtn]').should('be.visible').click();
  }

  scanItem(itemNumber) {
    cy.get('#hiddenInputField').type(`^${itemNumber}[114q`);
  }

  clickContinueButton() {
    cy.get('[data-qtag-continue-btn]').should('be.visible').click();
  }

  clickRemoveIcon() {
    cy.get('[data-qtag-removeitem-btn]').should('be.visible').click();
  }

  clickCancelButton() {
    cy.get('[data-qtag-intervention-declinebtn').should('be.visible').click();
  }
  clickEnterButton() {
    cy.get('[data-qtag-intervention-approvebtn]').should('be.visible').click();
  }

  validatePage() {
    cy.get('[data-qtag-itementry-itemnumber-input="true"]').should('be.visible');
    KEYBOARD_NUMBER_ELEMENTS.forEach((element) => {
      cy.get(`[data-qtag-alpha-key="${element}"]`).should('be.enabled');
    });
  }

  validateCustomerLookupPage() {
    cy.get('[data-qtag-phonenumber-input]').should('be.visible');
    KEYBOARD_NUMBER_ELEMENTS.forEach((element) => {
      cy.get(`[data-testid="${element}"]`).should('be.enabled');
    });
  }

  addBffItemManually(addItem, updateItem) {
    cy.fixture('inventoryLookUp/lookUpBff').then((response) => {
      cy.intercept('POST', CARBON_APIS.URLS.INVENTORY, response).as('Inventory');
      return;
    });

    cy.intercept('POST', bffAppUrls.addItem, {
      fixture: addItem
    }).as('Add Item WorkFile');

    cy.intercept('POST', `${bffAppUrls.updateLineItem}6960209587791152889`, {
      fixture: updateItem
    }).as('Edit Item WorkFile');
  }

  bffRemoveItemStub(itemNumber) {
    cy.intercept('POST', `${bffAppUrls.updateLineItem}6960209587791152889`, {
      fixture: `removeItem/RemoveSingleItem/update_${itemNumber}`
    }).as('removeItem');
  }

  addSingleItemStub(controller) {
    if (controller === '@BFF') {
      this.addBffItemManually('bffAddItem/addItem', 'bffUpdate_qty/updateQty');
    } else {
      cy.intercept('POST', NEW_WORKFILE_URL, {
        fixture: 'addItem/AddItemEntry/newWorkFile'
      }).as('New WorkFile');

      cy.intercept('POST', ADDITEM_WORKFILE_URL, {
        fixture: 'addItem/AddItemEntry/addItemWorkFile'
      }).as('Add Item WorkFile');

      cy.intercept('POST', EDITITEM_WORKFILE_URL, {
        fixture: 'addItem/AddItemEntry/editItemWorkFile'
      }).as('Edit Item WorkFile');
    }

    cy.intercept(DP_TRANSACTION_START_URL, {
      fixture: 'devicePlatform/transactionStart'
    }).as('Transaction Start');
  }

  bffAddRestrictedItem(itemType, itemNumber) {
    switch (itemType) {
      case 'MEASUREMENT_REQUIRED_ITEM':
        this.addBffItemManually(
          `bffAddItem/add_${itemNumber}.json`,
          `bffAddItem/add_${itemNumber}.json`
        );
        break;
    }
  }

  updateSingleItemQuantityStub(controller) {
    if (controller === '@BFF') {
      cy.fixture('inventoryLookUp/lookUpBff').then((response) => {
        cy.intercept('POST', CARBON_APIS.URLS.INVENTORY, response).as('Inventory');
      });

      cy.intercept('POST', bffAppUrls.addItem, {
        fixture: 'bffAddItem/addItemBff'
      }).as('Add Item WorkFile');

      cy.intercept('POST', `${bffAppUrls.updateLineItem}6976454089765320582`, {
        fixture: 'bffUpdate_qty/updateQtyBff'
      }).as('Edit Item WorkFile');
    } else {
      cy.intercept('POST', NEW_WORKFILE_URL, {
        fixture: 'editItem/EditItem/newWorkFile'
      }).as('New WorkFile');

      cy.intercept('POST', ADDITEM_WORKFILE_URL, {
        fixture: 'editItem/EditItem/addItemWorkFile'
      }).as('Add Item WorkFile');

      cy.intercept('POST', EDITITEM_WORKFILE_URL, {
        fixture: 'editItem/EditItem/editItemWorkFile'
      }).as('Edit Item WorkFile');
    }
    cy.intercept(DP_TRANSACTION_START_URL, {
      fixture: 'devicePlatform/transactionStart'
    }).as('Transaction Start');
  }

  editItemQuantity(controller) {
    cy.intercept(DP_TRANSACTION_START_URL, {
      fixture: 'devicePlatform/transactionStart'
    }).as('Transaction Start');
    if (controller === '@BFF') {
      cy.intercept('POST', `${bffAppUrls.updateLineItem}6976454089765320582`, {
        fixture: 'bffUpdate_qty/updateQtyEditItemBff'
      }).as('Update Item Quantity WorkFile');
    } else {
      cy.intercept('POST', EDITITEM_WORKFILE_URL, {
        fixture: 'editItem/EditItem/editItemWithIncreaseQuantity'
      }).as('Update Item Quantity WorkFile');
    }
  }

  addSingleScanItemStub(controller) {
    if (controller === '@BFF') {
      this.addBffItemManually('bffAddItem/addItem', 'bffUpdate_qty/updateQty');
    } else {
      cy.intercept('POST', NEW_WORKFILE_URL, {
        fixture: 'addItem/AddItemEntry/newWorkFile'
      }).as('New WorkFile');

      cy.intercept('POST', ADDITEM_WORKFILE_URL, {
        fixture: 'addItem/AddItemEntry/addItemScanWorkFile'
      }).as('Add Item WorkFile');

      cy.intercept('POST', EDITITEM_WORKFILE_URL, {
        fixture: 'addItem/AddItemEntry/editItemScanWorkFile'
      }).as('Edit Item WorkFile');
    }

    cy.intercept(DP_TRANSACTION_START_URL, {
      fixture: 'devicePlatform/transactionStart'
    }).as('Transaction Start');
  }

  addHighValueItemStub() {
    cy.intercept('POST', NEW_WORKFILE_URL, {
      fixture: 'addItem/addHighValueItemEntry/newWorkFile'
    }).as('New WorkFile');
    cy.intercept('POST', ADDITEM_WORKFILE_URL, {
      fixture: 'addItem/addHighValueItemEntry/addItemWorkFile'
    }).as('Add Item WorkFile');
    cy.intercept('POST', EDITITEM_WORKFILE_URL, {
      fixture: 'addItem/addHighValueItemEntry/editItemWorkFile'
    }).as('Edit Item WorkFile');
    cy.intercept(DP_TRANSACTION_START_URL, {
      fixture: 'devicePlatform/transactionStart'
    }).as('Transaction Start');
  }

  addRebateItemStub() {
    cy.intercept('POST', NEW_WORKFILE_URL, {
      fixture: 'rebateItem/newWorkFile'
    }).as('New WorkFile');
    cy.intercept('POST', ADDITEM_WORKFILE_URL, {
      fixture: 'rebateItem/addItemWorkFile'
    }).as('Add Item WorkFile');
    cy.intercept('POST', EDITITEM_WORKFILE_URL, {
      fixture: 'rebateItem/editItemWorkFile'
    }).as('Edit Item WorkFile');
    cy.intercept(DP_TRANSACTION_START_URL, {
      fixture: 'devicePlatform/transactionStart'
    }).as('Transaction Start');
  }

  applyEmployeeDiscountStub() {
    cy.intercept('POST', ADDITEM_WORKFILE_URL, {
      fixture: 'addItem/AddItemEntry/employeeDiscountAddItemWorkFile'
    }).as('Add Item WorkFile');
  }

  addMultipleItemStub(controller) {
    if (controller === '@BFF') {
      this.addBffItemManually('bffAddItem/addItem2', 'bffUpdate_qty/updateQty2');
    } else {
      cy.intercept('POST', ADDITEM_WORKFILE_URL, {
        fixture: 'addItem/MultipleItem/addItemWorkFile'
      }).as('Add Item WorkFile');
      cy.intercept('POST', EDITITEM_WORKFILE_URL, {
        fixture: 'addItem/MultipleItem/editItemWorkFile'
      }).as('Edit Item WorkFile');
    }
  }

  addInvalidItemStub(controller) {
    if (controller === '@BFF') {
      cy.intercept('POST', bffAppUrls.addItem, {
        fixture: 'addItem/InvalidItem/addInvalidItemBff'
      }).as('Add InvalidItem');
    }
    cy.intercept('POST', NEW_WORKFILE_URL, {
      fixture: 'addItem/AddItemEntry/newWorkFile'
    }).as('New WorkFile');
    cy.intercept('POST', ADDITEM_WORKFILE_URL, {
      fixture: 'addItem/InvalidItem/addItemWorkFile'
    }).as('Add Item WorkFile');
  }

  updateBffItemMultipleQuantity(controller) {
    if (controller === '@BFF') {
      cy.fixture('inventoryLookUp/lookUpBff').then((response) => {
        cy.intercept('POST', CARBON_APIS.URLS.INVENTORY, response).as('Inventory');
      });

      cy.intercept('POST', bffAppUrls.addItem, {
        fixture: 'editItemBff/addItemWithMultipleQuantity'
      }).as('Add Item WorkFile');

      cy.intercept('POST', `${bffAppUrls.updateLineItem}6976454089765320582`, {
        fixture: 'editItemBff/updateItemWithMultipleQuantity'
      }).as('Edit Item WorkFile');
    } else {
      cy.intercept('POST', NEW_WORKFILE_URL, {
        fixture: 'editItem/EditItem/newWorkFile'
      }).as('New WorkFile');
      cy.intercept('POST', ADDITEM_WORKFILE_URL, {
        fixture: 'editItem/EditItem/addItemWorkFile'
      }).as('Add Item WorkFile');
      cy.intercept('POST', EDITITEM_WORKFILE_URL, {
        fixture: 'editItem/EditItem/addItemWithMulitpleQuantity'
      }).as('Edit Item WorkFile');
    }
    cy.intercept(DP_TRANSACTION_START_URL, {
      fixture: 'devicePlatform/transactionStart'
    }).as('Transaction Start');

    cy.intercept(DP_INTERVENTION_START_URL, {
      fixture: ''
    }).as('Intervention Start');

    cy.intercept(DP_INTERVENTION_END_URL, {
      fixture: ''
    }).as('Intervention End');

    cy.intercept(DP_SIGNAL_URL, {
      fixture: ''
    }).as('Signal End');
  }

  addItemMultipleQuantity() {
    cy.intercept('POST', NEW_WORKFILE_URL, {
      fixture: 'addItem/AddItemEntry/newWorkFile'
    }).as('New WorkFile');
    cy.intercept('POST', ADDITEM_WORKFILE_URL, {
      fixture: 'addItem/AddItemEntry/addItemWorkFile'
    }).as('Add Item WorkFile');
    cy.intercept('POST', EDITITEM_WORKFILE_URL, {
      fixture: 'editItem/EditItem/addItemWithMulitpleQuantity'
    }).as('Edit Item WorkFile');
    cy.intercept(DP_INTERVENTION_START_URL, {
      fixture: ''
    }).as('Intervention Start');
    cy.intercept(DP_INTERVENTION_END_URL, {
      fixture: ''
    }).as('Intervention End');
    cy.intercept(DP_SIGNAL_URL, {
      fixture: ''
    }).as('Signal End');
  }

  reduceQuantityStub(controller) {
    if (controller === '@BFF') {
      cy.intercept(DP_TRANSACTION_START_URL, {
        fixture: 'devicePlatform/transactionStart'
      }).as('Transaction Start');
      cy.intercept('POST', `${bffAppUrls.updateLineItem}6976454089765320582`, {
        fixture: 'editItemBff/reduceItemQuantity'
      }).as('Update Item Quantity WorkFile');
    } else {
      cy.intercept(DP_TRANSACTION_START_URL, {
        fixture: 'devicePlatform/transactionStart'
      }).as('Transaction Start');
      cy.intercept('POST', EDITITEM_WORKFILE_URL, {
        fixture: 'editItem/EditItem/editItemWithDecreaseQuantity'
      }).as('Edit Item with Reduce Quantoty WorkFile');
    }
  }

  removeItemStubs() {
    cy.intercept('POST', `${bffAppUrls.updateLineItem}*`, {
      fixture: 'removeItem/RemoveSingleItem/bffRemoveItem'
    }).as('removeBffItem');
    cy.intercept(DP_INTERVENTION_START_URL, {
      fixture: ''
    }).as('Intervention Start');
    cy.intercept(EDITITEM_WORKFILE_URL, {
      fixture: 'removeItem/RemoveSingleItem/editItemWorkFile'
    }).as('Remove Item');
  }

  removeFirstItemStubs() {
    cy.intercept('POST', `${bffAppUrls.updateLineItem}*`, {
      fixture: 'removeItem/RemoveSingleItemInMultiple/bffRemoveSingleInMultiple'
    }).as('removeSingleInMultiple');
    cy.intercept(DP_INTERVENTION_START_URL, {
      fixture: ''
    }).as('Intervention Start');
    cy.intercept(EDITITEM_WORKFILE_URL, {
      fixture: 'removeItem/RemoveSingleItemInMultiple/editItemWorkFile'
    }).as('Remove first Item');
  }

  cancelSaleStubs() {
    cy.intercept(DP_TRANSACTION_ABORT_URL, {
      fixture: ''
    }).as('Transaction Abort');
    cy.intercept(CANCEL_WORKFILE_URL, {
      fixture: 'removeItem/RemoveSingleItem/cancelWorkFile'
    }).as('Cancel Work File');
    cy.intercept(RESET_WORKFILE_URL, {
      fixture: 'removeItem/RemoveSingleItem/resetWorkFile'
    }).as('Reset Work File');
    cy.intercept(DP_INTERVENTION_END_URL, {
      fixture: ''
    }).as('Intervention Start');
  }

  paymentStartStubs(item = '') {
    const fixtureUrl = item
      ? 'rebateItem/getResourceBundle'
      : 'tenderType/tenderWithCardPayment/tender/getResourceBundle';
    cy.intercept(DP_PAYMENT_START_URL, {
      fixture: ''
    }).as('Payment Start');
    cy.intercept('GET', GET_RESOURCE_BUNDLE_URL, {
      fixture: fixtureUrl
    }).as('Get Resource Bundle');
  }

  paymentStartStubsBFF() {
    const fixtureUrl = 'tenderType/tenderWithCardPayment/tender/';
    cy.intercept('GET', `${CARBON_URL}${bffAppUrls.generateInvoice}6335`, {
      fixture: `${fixtureUrl}generateInvoice`
    }).as('Generate Invoice');
    cy.intercept('GET', `${CARBON_URL}${bffAppUrls.viewCart}6960209587791152889`, {
      fixture: `${fixtureUrl}viewCart`
    }).as('View Cart');
    cy.intercept('GET', `${CARBON_URL}${bffAppUrls.configurations}`, {
      fixture: `${fixtureUrl}configuration`
    }).as('Configuration');
    cy.intercept('GET', `${CARBON_URL}${bffAppUrls.initiateCheckout}6960209587791152889`, {
      fixture: `${fixtureUrl}cartCheckout`
    }).as('Checkout');
    cy.intercept('POST', DP_ACTIVATE_URL, {
      fixture: 'devicePlatform/activate'
    }).as('Payment Activate');
    cy.intercept('PUT', DP_PAYMENT_START_URL, {
      fixture: ''
    }).as('Payment Start');
  }

  addHardStopItemStub() {
    cy.intercept('POST', NEW_WORKFILE_URL, {
      fixture: 'addItem/addHardStopItemEntry/newWorkFile'
    }).as('New WorkFile');
    cy.intercept('POST', ADDITEM_WORKFILE_URL, {
      fixture: 'addItem/addHardStopItemEntry/addItemWorkFile'
    }).as('Add Item WorkFile');
  }

  enterItemAndClickEnter(itemNumber, lookupType = '', inputField = '') {
    if (inputField === 'merchCardInputField') {
      this.validateMerchcardInterventionPage();
    } else {
      lookupType === 'Military' ? this.validateCustomerLookupPage() : this.validatePage();
    }
    const item = itemNumber.toString().split('');
    item.forEach((element) => {
      if (parseInt(element) === 0) {
        cy.get(`[data-testid="0"]`).click();
      } else {
        cy.get(`[data-qtag-alpha-key="${element}"]`).click();
      }
    });
    cy.get('[data-key="Enter"]').click();
  }

  validateMerchcardInterventionPage() {
    cy.get('[data-qtag-drivers-license-input="true"]').should('be.visible').click();
    cy.get(`[data-key="123"]`).click();
    KEYBOARD_NUMBER_ELEMENTS.forEach((element) => {
      cy.get(`[data-qtag-alpha-key="${element}"]`).should('be.enabled');
    });
  }

  clearButton() {
    cy.get("[data-testid='Clear']").click();
  }

  enterItemAndClickSearch(itemName) {
    const item = itemName.toString().split('');
    item.forEach((element) => {
      cy.get(`[data-key="${element}"]`).click();
    });
  }

  enterItemQtyAndClickEnter(itemQty) {
    const item = itemQty.toString().split('');
    cy.get('[data-key="backspace"]').click();
    item.forEach((element) => {
      cy.get(`[data-qtag-alpha-key="${element}"]`).click();
    });
    cy.get('[data-key="Enter"]').click();
  }

  validateAddQuantityPage(usermsg) {
    cy.get('[data-qtag-itemqty-usermsg="true"]').should('be.visible').should('have.text', usermsg);
    cy.get('[data-qtag-itemimage="true"]').should('be.visible');
    cy.get('[data-qtag-itemnumber="true"]').should('be.visible');
    cy.get('[data-qtag-itemdescription="true"]').should('be.visible');
    cy.get('[data-qtag-keyboard-alpha="true"]').should('be.visible');
  }

  enterValueAndClickEnter(discountValue) {
    const item = discountValue.toString().split('');
    item.forEach((element) => {
      cy.get(`[data-key="${element}"]`).click();
    });
    cy.get('[data-key="Enter"]').click();
  }

  validateItemImage(controller) {
    if (controller === '@BFF') {
      cy.get('[data-qtag-itemimage="true"]')
        .should('be.visible')
        .find('img')
        .should(
          'have.attr',
          'src',
          'https://images.lowes.com/product/converted/088991/088991550315.jpg?size=sm'
        );
    }
  }
}

export default new ItemEntry();
