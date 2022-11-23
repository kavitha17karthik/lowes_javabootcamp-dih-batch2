class PhotoIdScanPage {
  get backButton() {
    return cy.get('[data-qtag-common-backbtn]');
  }

  get scanErrorMessage() {
    return cy.get('[data-qtag-scan-photo-id-errormsg]');
  }
  get scanPhotoIdText() {
    return cy.get('[data-qtag-scan-photo-id-msg-text]');
  }

  get tapHelpText() {
    return cy.get('[data-qtag-tap-help-msg-text]');
  }

  get helpButton() {
    return cy.get('[data-qtag-help-btn]');
  }

  validatePage() {
    this.scanPhotoIdText.should('be.visible').should('have.text', 'Scan the back of your photo ID');
    this.tapHelpText.should('be.visible').should('have.text', 'or tap Help for assistance.');
    this.helpButton.should('be.visible').should('have.text', 'Help');
    this.backButton.should('be.visible').should('have.text', 'Back');
  }

  validateDLScanSuccess(proToastMessage, proText) {
    cy.get('[data-qtag-toastmsg]').should('be.visible').should('have.text', proToastMessage);
    cy.get("[data-qtag='PRO']").should('have.text', proText);
  }

  validateDLScanMismatchEMessage(tryAgainMessage) {
    this.scanErrorMessage.should('be.visible').should('have.text', tryAgainMessage);
  }

  validateInvalidScanMessage(invalidScanMessage) {
    this.scanErrorMessage.should('be.visible').should('have.text', invalidScanMessage);
  }
}
export default new PhotoIdScanPage();
