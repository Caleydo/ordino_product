/// <reference types="cypress" />

function checkTour() {
  cy.get('.tdp-tour-step-dots > div')
    .each(($el, index, $list) => {
      // check that the step counter shows the correct number
      cy.get('.tdp-tour-step-count').should(($node) => {
        expect($node).to.contain(index + 1);
      });

      if($list.length === index+1) {
        cy.get('.tdp-tour-step-navigation button').contains('Finish').click();
      } else {
        cy.get('.tdp-tour-step-navigation button').contains('Next').click();
      }
    });
}

function getTourIds() {
  let ids = [];
  // open the tour chooser dialog
  cy.get('a[data-target="#tdpTourChooser"]').should('be.visible').click();

  return new Cypress.Promise((resolve) => {
    cy.get('#tdpTourChooser .modal-body ul > li')
      .should('be.visible') // make sure the dialog is visible
      .each($el =>
        cy.wrap($el).invoke('attr', 'data-id').then(id => ids.push(id))
      )
      .then(() => resolve(ids));
  });
}

context('Ordino Tours', () => {

  it('Test all tours', () => {
    cy.visit('https://ordino-daily.caleydoapp.org', {
      onBeforeLoad: (win) => {
        // workaround to clear sessionStorage (see https://github.com/cypress-io/cypress/issues/413#issuecomment-356969904)
        win.sessionStorage.clear();
      }
    });

    cy.clearCookies();
    cy.clearLocalStorage();

    // cy.get('#cookie-bar-button', { timeout: 10000 }).should('be.visible').click();

    cy.get('#loginDialog button').should('be.visible').contains('Login').click();

    cy.wait(500);

    // dismiss database migration dialog
    cy.get('.modal-title').should('be.visible').contains('Ordino just got better!').closest('.modal-content').find('.modal-footer button').contains('Close').click();

    getTourIds().then((ids) => {
      // loop through every tour
      ids.forEach((id) => {
        // find and start current tour
        cy.get(`#tdpTourChooser .modal-body ul > li[data-id="${id}"]`).find('a').click();

        checkTour();

        // open tour chooser dialog again
        cy.get('a[data-target="#tdpTourChooser"]').should('be.visible').click();
      });

      // final check if all tours are tested
      cy.get('#tdpTourChooser .modal-body ul > li').should(($lis) => {
        expect($lis).to.have.length(ids.length);

        const allChecked = $lis.get().every((li) => {
          return li.querySelector('i').classList.contains('fa-check-square');
        });

        expect(allChecked).to.eq(true);
      });
    });
  });
});
