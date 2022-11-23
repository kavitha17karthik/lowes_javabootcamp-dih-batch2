class CashierTools {
  get cashierToolsButton() {
    return cy.get('[data-qtag-attendent-tools-btn="true"]').should('be.visible');
  }

  get changeCashierButton() {
    return cy.get('[data-qtag-menu-change-cashier-btn="true"]').should('be.visible');
  }

  validateCurrentCashierName(currentCashierName) {
    cy.get('[data-qtag-current-cashier-name-text="true"]').should('have.text', currentCashierName);
  }

  validateCashierToolsPage() {
    cy.get('[data-qtag-common-backbtn="true"]').should('be.visible');
    cy.get('[data-qtag-cashier-tools-title="true"]').should('be.visible');
    cy.get('[data-qtag-menu-print-barcode-btn="true"]').should('be.visible');
    cy.get('[data-qtag-menu-close-lane-btn="true"]').should('be.visible');
    cy.get('[data-qtag-menu-logoff-report-btn="true"]').should('be.visible');
    cy.get('[data-qtag-menu-change-cashier-btn="true"]').should('be.visible');
  }
}

export default new CashierTools();
