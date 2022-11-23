import {
  ADDITEM_WORKFILE_URL,
  DP_TRANSACTION_START_URL,
  EDITITEM_WORKFILE_URL,
  NEW_WORKFILE_URL
} from '../apiConfigUrls';

import {
  INVALID_MANAGER_PASSCODE,
  VALID_MANAGER_PASSCODE,
  KEYBOARD_NUMBER_ELEMENTS
} from '../../support/constants';

class managerPasscode {
  clickManagerApproval() {
    cy.get('[data-qtag-managerapproval-input]').should('be.visible');
  }

  clickManagerApprovalCancel() {
    cy.get('[data-qtag-cancel-btn]').click();
  }

  clickSelectRCAdministrative() {
    cy.get('[data-qtag-reasoncode="Administrative"]').click();
  }

  addSingleItemManagerPriceUnlockStub(controller) {
    if (controller === '@BFF') {
      this.addBffItemManually('bffAddItem/addItem', 'bffUpdate_qty/updateQty');
    } else {
      cy.intercept('POST', NEW_WORKFILE_URL, {
        fixture: 'addItem/AddItemEntry/newWorkFile'
      }).as('New WorkFile');

      cy.intercept('POST', ADDITEM_WORKFILE_URL, {
        fixture: 'managerPriceUnlock/addItemWorkFile'
      }).as('Add Item WorkFile');

      cy.intercept('POST', EDITITEM_WORKFILE_URL, {
        fixture: 'managerPriceUnlock/editItemWorkFile'
      }).as('Edit Item WorkFile');
    }
    cy.intercept(DP_TRANSACTION_START_URL, {
      fixture: 'devicePlatform/transactionStart'
    }).as('Transaction Start');
  }
  addSingleItemPriceRequiredStub(controller) {
    if (controller === '@BFF') {
      this.addBffItemManually('bffAddItem/addItem', 'bffUpdate_qty/updateQty');
    } else {
      cy.intercept('POST', NEW_WORKFILE_URL, {
        fixture: 'addItem/AddItemEntry/newWorkFile'
      }).as('New WorkFile');

      cy.intercept('POST', ADDITEM_WORKFILE_URL, {
        fixture: 'managerPriceUnlock/addItemPriceRequiredScan'
      }).as('Add Item WorkFile');
    }
    cy.intercept(DP_TRANSACTION_START_URL, {
      fixture: 'devicePlatform/transactionStart'
    }).as('Transaction Start');
  }
  addSingleItemPriceReqCancelStub(controller) {
    if (controller === '@BFF') {
      this.addBffItemManually('bffAddItem/addItem', 'bffUpdate_qty/updateQty');
    } else {
      cy.intercept('POST', EDITITEM_WORKFILE_URL, {
        fixture: 'managerPriceUnlock/editItemRemoveItemWorkFile'
      }).as('Edit Item WorkFile');
    }
    cy.intercept(DP_TRANSACTION_START_URL, {
      fixture: 'devicePlatform/transactionStart'
    }).as('Transaction Start');
  }

  addManagerPasscodeStub(managerPasscode = '') {
    let fixtureURL =
      managerPasscode === INVALID_MANAGER_PASSCODE
        ? 'editItemInvalidPasscodeWorkFile'
        : managerPasscode === VALID_MANAGER_PASSCODE
        ? 'editItemValidPasscodeWorkFile'
        : 'editItemWorkFile';

    cy.intercept('POST', EDITITEM_WORKFILE_URL, {
      fixture: `managerPriceUnlock/${fixtureURL}`
    }).as('Edit Item WorkFile');
  }

  removeItemFromSaleStub() {
    cy.intercept(EDITITEM_WORKFILE_URL, {
      fixture: 'managerPriceUnlock/editItemRemoveItemWorkFile'
    }).as('Remove Item');
  }

  validateManagerApprovalPage() {
    cy.get('[data-qtag-managerapproval-msg="true"]').should('be.visible');
    cy.get('[data-qtag-managerapproval-input="true"]').should('be.visible');
    cy.get('[data-qtag-managerapproval-reasoncode="true"]').should('be.visible');
  }
  validateManagerApprovedPrice() {
    cy.get('[data-qtag-cartpage-lineitem="1"]').click();
    cy.get('[data-qtag-itemqty-input="true"]').should('be.disabled');
    cy.get('[data-qtag-itemsellingprice-input="true"]').should('be.disabled');
    cy.get('[data-qtag-common-backbtn="true"]').click();
  }

  validatePriceChangeReasonPage() {
    cy.get('[data-qtag-common-backbtn="true"]').should('be.visible');
    cy.get('[data-qtag-reasoncode-text="true"]').should('be.visible');
    cy.get('[data-qtag-reasoncode="Damaged / Clearance"]').should('be.visible');
    cy.get('[data-qtag-reasoncode="Quoted Price"]').should('be.visible');
    cy.get('[data-qtag-reasoncode="Competitor Price"]').should('be.visible');
    cy.get('[data-qtag-reasoncode="Incorrect Price"]').should('be.visible');
    cy.get('[data-qtag-reasoncode="Promotion / Coupon"]').should('be.visible');
    cy.get('[data-qtag-reasoncode="Administrative"]').should('be.visible');
    cy.get('[data-qtag-continue-btn="true"]').should('be.visible');
  }

  validateSellingPricePage() {
    cy.get('[data-qtag-itemqty-usermsg="true"]').should('be.visible');
    KEYBOARD_NUMBER_ELEMENTS.forEach((element) => {
      cy.get(`[data-qtag-alpha-key="${element}"]`).should('be.enabled');
    });
  }
  validateRemoveItemPage() {
    cy.get('[data-qtag-intervention-itemdescription="true"]').should('be.visible');
    cy.get('[data-qtag-intervention-itemimage="true"]').should('be.visible');
    cy.get('[data-qtag-intervention-declinebtn="true"]').should('be.visible');
  }
}
export default new managerPasscode();
