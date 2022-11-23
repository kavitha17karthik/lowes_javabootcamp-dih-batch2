class CancelPaymentConfirmationPage {
  get cancelPaymentText() {
    return cy.get('[data-qtag-intervention-approvalreason]');
  }

  get cancelPaymentDescription() {
    return cy.get('[data-qtag-intervention-descriptionmsg]');
  }
  get cancelPaymentGotItButton() {
    return cy.get('[data-qtag-intervention-approvebtn]');
  }

  get cashText() {
    return cy.xpath("//span[text()='Cash']");
  }

  get giftCardText() {
    return cy.xpath("//span[text()='Gift card']");
  }
}

export default new CancelPaymentConfirmationPage();
