import {
  DP_REGISTER_URL,
  DP_SIGNAL_URL,
  SCO_METRICS_DEV,
  STOREINFO_URL,
  SCO_LOGS_STG
} from '../apiConfigUrls';

class ScoLanding {
  initiateScoEnvironment(tenderType = '') {
    cy.intercept('POST', DP_SIGNAL_URL, {
      fixture: 'devicePlatform/signal'
    }).as('signal');
    cy.intercept('GET', STOREINFO_URL, { fixture: 'common/storeInfo' }).as('storeInfo');
    cy.intercept('GET', DP_REGISTER_URL, {
      fixture: `devicePlatform/register${tenderType}`
    }).as(`${tenderType}register`);
    cy.intercept(SCO_METRICS_DEV, { fixture: '' }).as('SCO Metrics Dev');
    cy.intercept(SCO_LOGS_STG, { fixture: '' }).as('SCO Logs Stg');
  }

  getRegisterResponse(type = '') {
    cy.intercept('GET', DP_REGISTER_URL, {
      fixture: `devicePlatform/register${type}`
    });
  }

  tenderTypeAvailable(tenderType) {
    return cy.get('[data-qtag-startscan-cardsonly-msg]').should('have.text', tenderType);
  }

  bannerCloseButton() {
    return cy.get('[data-qtag-hwerror-closebtn]').should('be.visible').click();
  }

  pheripheralBannerMessage(bannerMessage) {
    cy.get('[data-qtag-peripheral-message]').should('have.text', bannerMessage);
  }
}

export default new ScoLanding();
