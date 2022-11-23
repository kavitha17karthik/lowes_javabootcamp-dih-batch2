import {
  ITEM_LOOKUP_AUTOCOMPLETE,
  ITEM_LOOKUP_PRODUCT_LIST,
  ADDITEM_WORKFILE_URL
} from '../apiConfigUrls';

class ItemLookupPage {
  get itemLookupButton() {
    return cy.get('[data-qtag-item-lookup-btn="true"]').should('be.visible');
  }

  itemLookupSearchStub() {
    cy.intercept('GET', ITEM_LOOKUP_AUTOCOMPLETE, {
      fixture: 'itemLookup/itemLookupAutoComplete'
    }).as('itemLookup AutoComplete');
    cy.intercept('GET', ITEM_LOOKUP_PRODUCT_LIST, {
      fixture: 'itemLookup/itemLookupProductList'
    }).as('itemLookup ProductList');
    cy.intercept('POST', ADDITEM_WORKFILE_URL, {
      fixture: 'itemLookup/additemForItemSearch'
    }).as('additemForItemSearch');
  }

  selectCatagory() {
    cy.get(`[data-qtag-category-list="0"]`).click();
  }

  addItemToCart() {
    cy.xpath(`(//div[contains(@class,'productImageContainer')])[1]`).should('be.visible').click();
  }

  validateItemNotFound() {
    cy.get('[data-qtag-item-lookup-no-result-found="true"]').should('be.visible');
    cy.get('[data-qtag-common-backbtn="true"]').should('be.visible').click();
  }

  validateItemLookupPage() {
    cy.get('[data-qtag-common-backbtn="true"]').should('be.visible');
    cy.get('[data-qtag-item-lookup-header="true"]').should('be.visible');
    cy.get('[data-qtag-item-lookup-input-field="true"]').should('be.visible');
    cy.get('[data-qtag-keyboard-alpha="true"]').should('be.visible');
  }
}

export default new ItemLookupPage();
