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
  cy.get('#ordino_tours_tab-tab').should('be.visible').click();

  return new Cypress.Promise((resolve) => {
    cy.get('.ordino-tour-card')
      .each($el =>
        cy.wrap($el).invoke('attr', 'data-id').then(id => ids.push(id))
      )
      .then(() => resolve(ids));
  });
}

context('Ordino Tours', () => {

  it('Test all tours', () => {
    cy.visit(Cypress.env('host'), {
      onBeforeLoad: (win) => {
        // workaround to clear sessionStorage (see https://github.com/cypress-io/cypress/issues/413#issuecomment-356969904)
        win.sessionStorage.clear();
      }
    });

    cy.clearCookies();
    cy.clearLocalStorage();

    cy.wait(500); // wait for cookie bar to load and initialize

    cy.get('#cookie-bar-button').should(($button) => {
      if ($button.length === 0) {
        console.log('no #cookie-bar-button found');
        return; // no cookie bar visible (e.g., if called with an IP outside of the EU)
      }
      console.log('click #cookie-bar-button');
      $button[0].click(); // if cookie bar is visible click the button to hide the bar
    });

    cy.wait(1000); // wait for login dialog (i.e., Bootstrap modal) initialization

    // type username and password for local testing without generated username
    // cy.get('#login_username').type('admin');
    // cy.get('#login_password').type('admin');

    cy.get('#loginDialog button[type="submit"]').should('be.visible').click();

    cy.wait(500); // wait to finish login and start provenance graph

    getTourIds().then((ids) => {
      // loop through every tour
      ids.forEach((id) => {
        // find and start current tour
        cy.get(`.ordino-tour-card[data-id="${id}"]`).find('a').click();

        checkTour();

        // open tour chooser dialog again
        cy.get('#ordino_tours_tab-tab').should('be.visible').click();
      });

      // final check if all tours are tested
      // cy.get('#tdpTourChooser .modal-body ul > li').should(($lis) => {
      //   expect($lis).to.have.length(ids.length);

      //   const allChecked = $lis.get().every((li) => {
      //     return li.querySelector('i').classList.contains('fa-check-square');
      //   });

      //   expect(allChecked).to.eq(true);
      // });
    });
  });
});
