class PrintSelectionPage {
  validateInstructionalMsg(msg) {
    cy.get('[data-qtag-receipt-instructionalmsg="true"]').should('have.text', msg);
  }
}

export default new PrintSelectionPage();
