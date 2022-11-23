import { DP_INTERVENTION_END_URL, DP_SIGNAL_URL } from '../apiConfigUrls';
import { bffUrls } from '../bff-urls/bffUrls';

const reg = Cypress.env('SCO_REG');
const bffAppUrls = bffUrls(reg);
class AgeRestrictionIntervention {
  ageRestrictedFirstItemStub() {
    cy.intercept('POST', bffAppUrls.addItem, {
      fixture: 'ageRestrictedIntervention/firstAgeRestrictedItem'
    }).as('Add Item');
  }

  interventionItemApproveStub() {
    cy.intercept('POST', DP_SIGNAL_URL, {
      fixture: 'devicePlatform/signal'
    }).as('signal');
    cy.intercept(DP_INTERVENTION_END_URL, {
      fixture: ''
    }).as('Intervention End');
    cy.intercept('POST', bffAppUrls.addItem, {
      fixture: 'ageRestrictedIntervention/approvedItem'
    }).as('Approved Item');
  }
}

export default new AgeRestrictionIntervention();
