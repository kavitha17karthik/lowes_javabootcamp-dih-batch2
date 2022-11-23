import { CR_STASH_OPEN_URL } from '../apiConfigUrls';

class CashManagement {
  validateStashUnlocked() {
    cy.get('[data-qtag-cr-process-message="true"]').should(
      'have.text',
      'Collection door has been unlocked.'
    );
    cy.get('[data-qtag-cr-process-message-desc="true"]').should(
      'have.text',
      'Remove all bills, replace cassette and close collection door when you are done.'
    );
  }

  validateStashRemoved() {
    cy.get('[data-qtag-cr-process-message="true"]').should(
      'have.text',
      'Cassette has been removed.'
    );
    cy.get('[data-qtag-cr-process-message-desc="true"]').should(
      'have.text',
      'Remove all bills, replace cassette and close collection door.'
    );
  }

  validateStashLocked() {
    cy.get('[data-qtag-cr-process-message="true"]').should(
      'have.text',
      'Cassette has been removed.'
    );
    cy.get('[data-qtag-cr-process-message-desc="true"]').should(
      'have.text',
      'Remove all bills, replace cassette and close collection door.'
    );
  }

  validateCollectionDoorIntervention() {
    cy.get('[data-qtag-intervention-msg="true"]').should(
      'have.text',
      'Cassette needs to be emptied.'
    );
    cy.get('[data-qtag-intervention-descriptionmsg="true"]').should(
      'have.text',
      'Tap Unlock Collection Door and remove all bills.'
    );
    cy.get('[data-qtag-unlock-collection-door-btn="true"]').should('be.visible');
  }

  clickUnlockCollectionDoor(storeMode = false) {
    cy.intercept('PUT', CR_STASH_OPEN_URL, {
      fixture: ''
    }).as('CR Stash Open');
    cy.get('[data-qtag-unlock-collection-door-btn="true"]').should('be.visible').click();
    if (storeMode) {
      cy.get('[data-qtag-return-to-cart-btn="true"]').should('be.visible');
    } else {
      cy.get('[data-qtag-store-mode-btn="true"]').should('be.visible');
    }
  }

  stashUnlocked() {
    cy.wait(3000).then(() => {
      window.socket.stashUnlocked();
      return cy.wait(2000);
    });
  }

  stashRemoved() {
    cy.wait(3000).then(() => {
      window.socket.stashRemoved();
      return cy.wait(2000);
    });
  }

  stashLocked() {
    cy.wait(3000).then(() => {
      window.socket.stashLocked();
      return cy.wait(2000);
    });
  }

  stashInserted() {
    cy.wait(3000).then(() => {
      window.socket.stashInserted();
      return cy.wait(2000);
    });
  }

  stashInsertedError() {
    cy.wait(3000).then(() => {
      window.socket.stashInsertedError();
      return cy.wait(2000);
    });
  }
}

export default new CashManagement();
