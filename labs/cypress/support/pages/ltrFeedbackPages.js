import { LTR_FEEDBACK } from '../apiConfigUrls';
class LtrFeedbackPage {
  validateFeedbackQuestionaire(question) {
    if (question) {
      cy.get('[data-qtag-feedback-questionaire="true"]').should('have.text', question);
    }
  }

  provideFeedback(rating) {
    if (rating) {
      cy.contains(`${rating} Stars`).click();
    }
  }

  validateAPICall(feedback) {
    cy.intercept('PUT', LTR_FEEDBACK, (req) => {
      expect(req.body.ltr[0].values[0]).to.equal(feedback);
    });
  }

  validateThanksForFeedback() {
    cy.get('[data-qtag-feedback-questionaire="true"]').should(
      'have.text',
      'Thank you for your feedback!'
    );
  }

  validateFeedbackIsDisabled() {
    cy.get('[data-qtag-feedback-questionaire="true"]').should('not.exist');
  }
}

export default new LtrFeedbackPage();
