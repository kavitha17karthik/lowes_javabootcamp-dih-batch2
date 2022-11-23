class proID {
  get invalidQRCodeScanPage() {
    return cy.get('[data-qtag-intervention-approvalreason]');
  }

  get continueButton() {
    return cy.get('[data-qtag-intervention-approvebtn]');
  }

  get gotItButton() {
    return cy.get('[data-qtag-expired-pro-qrcode-button]');
  }

  get QRCodeErrorMessage() {
    return cy.get('[data-qtag-expired-pro-qrcode-error-message]');
  }

  validateProIDScanSuccess(proToastMessage, proText) {
    cy.get('[data-qtag-toastmsg]').should('be.visible').should('have.text', proToastMessage);
    cy.get("[data-qtag='PRO']").should('have.text', proText);
  }

  validateInvalidProIDScanPage() {
    this.invalidQRCodeScanPage
      .should('be.visible')
      .should('have.text', 'An invalid barcode was scanned.');
    this.continueButton.should('be.visible').should('have.text', 'Continue');
  }

  validateExpiredProIDScanPage(expiredText, tryAgainMessage) {
    cy.get('[data-qtag-expired-pro-qrcode-title1]')
      .should('be.visible')
      .should('have.text', expiredText);
    cy.get('[data-qtag-expired-pro-qrcode-title2]')
      .should('be.visible')
      .should('have.text', tryAgainMessage);
  }

  validateInvalidScanMessage(invalidScanMessage) {
    this.QRCodeErrorMessage.should('be.visible').should('have.text', invalidScanMessage);
  }
}
export default new proID();
