import {
  CUSTOMER_LOOKUP_WORKFILE,
  DP_INTERVENTION_START_URL,
  DP_INTERVENTION_END_URL,
  VERIFIED_CUSTOMER_LOOKUP_WORKFILE,
  DP_INTERVENTION_ERROR_URL
} from '../apiConfigUrls';

class attachCustomerLookup {
  get militaryDiscountMenu() {
    return cy.get('[data-qtag-menu-militarydiscount-btn]');
  }

  get phoneNumberFieldVerify() {
    return cy.get('[data-qtag-phonenumber-input-text]');
  }

  get militaryTextVerify() {
    return cy.get('[data-qtag-lookup-text]');
  }

  get noResultsFound() {
    return cy.get('[data-qtag-lookup-noresults]');
  }

  get militaryInputField() {
    return cy.get('[data-qtag-phonenumber-input]]');
  }

  radioButton() {
    cy.get('[name=Radio]').click();
  }

  applyButton() {
    cy.get('[data-qtag-continue-btn]').click();
  }

  validateVerifiedCustomer() {
    cy.get('[data-qtag-lookupresult-status]').should('be.visible').should('have.text', 'Verified');
  }

  validatePhotoInfoText() {
    cy.get('[data-qtag-confirmation-text]').should('be.visible');
  }

  customerYesButton() {
    cy.get('[data-qtag-yesbtn]').should('be.visible').click();
  }

  customerNoButton() {
    cy.get('[data-qtag-nobtn]').should('be.visible').click();
  }

  validateMilitaryAppliedSuccessfully() {
    cy.get("[data-qtag='MILITARY']").should('be.visible').should('have.text', 'Military');
  }

  validateMilitaryLookupPage() {
    this.militaryTextVerify.should('be.visible').should('have.text', 'Military Lookup');
    this.phoneNumberFieldVerify.should('be.visible').should('have.text', 'Enter your phone #.');
  }

  customerLookupStub(customerType) {
    cy.intercept('POST', CUSTOMER_LOOKUP_WORKFILE, {
      fixture: `customerLookup/${customerType}MilitaryLookUp`
    }).as('Military lookup workfile');
    cy.intercept(DP_INTERVENTION_START_URL, {
      fixture: ''
    }).as('Intervention Start');
    cy.intercept('POST', VERIFIED_CUSTOMER_LOOKUP_WORKFILE, {
      fixture: `customerLookup/successMilitaryLookUp`
    }).as('Success workfile');
    cy.intercept(DP_INTERVENTION_END_URL, {
      fixture: ''
    }).as('Intervention End');
    cy.intercept(DP_INTERVENTION_ERROR_URL, {
      fixture: ''
    }).as('Intervention Error');
  }
}

export default new attachCustomerLookup();
