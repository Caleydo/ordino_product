"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitLineupReady = exports.waitForApiCalls = exports.loginPublic = exports.scrollElementIntoCenter = exports.checkIfInputCompleted = exports.checkScoreColLoaded = exports.checkColCount = exports.waitTdpNotBusy = exports.waitPhoveaNotBusy = exports.formSelect = exports.select2SingleSelect = exports.select2MultiSelect = exports.clearInputForm = exports.fillInForm = void 0;
/**
 * Type text in a form input element and check if input is completed
 * @param {string} selector - the selector of the element as returned by cypress studio
 * @param {string} text - text that should be inserted into the form input
 */
function fillInForm(selector, text) {
    cy.get(selector).should('be.visible');
    cy.get(selector).click().type(text, { delay: 0 }); // use delay to ensure that complete text is filled in
    return checkIfInputCompleted(text, selector);
}
exports.fillInForm = fillInForm;
/**
 * Clear all text in a form input element
 * @param {string} selector - the selector of the element as returned by cypress studio
 */
function clearInputForm(selector) {
    return cy.get(selector).should('be.visible').clear();
}
exports.clearInputForm = clearInputForm;
/**
 * This function must be used to select elements from selet2 multi select form elements.
 * @param {string} id - data-testid of wrapping div (can be deducted from the title by making it lowercase and replacing space by -). For select2 search filds in the form map it must be given as: row-[row number starting from 1] (no brackets)
 * @param {string[] | string} searchString - either a single string or an array of strings if multiselect is possible
 */
function select2MultiSelect(id, searchString) {
    // if a single string is given, convert it into a list, else leave it as is
    var searchStrings = [];
    if (typeof searchString === 'string' || searchString instanceof String) {
        searchStrings = [searchString];
    }
    else {
        searchStrings = searchString;
    }
    cy.get("[data-testid=\"" + id + "\"] .select2-hidden-accessible").select([], { force: true });
    // iterate over search strings and select resulting options
    searchStrings.forEach(function (searchTerm) {
        cy.get("[data-testid=\"" + id + "\"] [data-testid=select2-search-field]").type(searchTerm);
        // flake solution: wait for the search for the searchString to finish
        cy.get('.select2-results__option').should('not.have.length', 0);
        cy.contains('.select2-results__option', searchTerm)
            .should('be.visible').click();
        // confirm Select2 widget renders the name
        cy.get("[data-testid=\"" + id + "\"] .select2-container")
            .should('include.text', searchTerm);
    });
}
exports.select2MultiSelect = select2MultiSelect;
/**
 * This function must be used to select elements from selet2 single select form elements.
 * @param {string} id - data-testid of wrapping div (can be deducted from the title by making it lowercase and replacing space by -). For select2 search filds in the form map it must be given as: row-[row number starting from 1] (no brackets)
 * @param {string} searchString - either a single string or an array of strings if multiselect is possible
 */
function select2SingleSelect(id, searchString) {
    cy.get("[data-testid=\"" + id + "\"] .select2-selection--single").click();
    cy.get('.select2-results__option').contains(searchString).click();
}
exports.select2SingleSelect = select2SingleSelect;
/**
 * This function must be used to select elements in form maps.
 * @param {string} rowId - In a form select multiple rows can be added. This input must be given as: row-[row number starting from 1] (no brackets)
 * @param {string} selectOption - either a single string or an array of strings if multiselect is possible
 */
function formSelect(rowId, selectOption) {
    return cy.get("[data-testid=" + rowId + "] [data-testid=form-select]").select(selectOption);
}
exports.formSelect = formSelect;
/**
 * Wait until phovea-busy and loading icon are hidden
 */
function waitPhoveaNotBusy() {
    return cy.get('.phovea-busy').should('have.attr', 'hidden');
}
exports.waitPhoveaNotBusy = waitPhoveaNotBusy;
/**
 * Wait until phovea-busy and loading icon are hidden
 */
function waitTdpNotBusy() {
    return cy.get('.tdp-busy').should('not.exist');
}
exports.waitTdpNotBusy = waitTdpNotBusy;
/**
 * Count columns in the ranking and wait until the new column has been added
 * Auxilary function for checkScoreColLoaded. Count columns in the ranking and wait until the new column has been added
 * @param {number} rankingId - ID of the ranking to search in, e.g. 0 for the initial ranking, 1 for the first detail view etc.
 * @param {string[]} totalNumColumns - total number of columns that are expected after adding them
 */
function checkColCount(rankingId, totalNumColumns) {
    var colsSelector = "[data-testid=viewWrapper-" + rankingId + "] > .view > .inner > .tdp-view.lineup > div > main > header > article > section";
    cy.get(colsSelector)
        .then(function (sectionElements) {
        var sectionElementCount = Cypress.$(sectionElements).length;
        cy.get(colsSelector).should('have.length', totalNumColumns);
    });
}
exports.checkColCount = checkColCount;
/**
 * Check if a score column has finished loading
 * Finds score column by searching for input strings in title, label and sublabel of the columns
 * @param {number} rankingId - ID of the ranking to search in, e.g. 0 for the initial ranking, 1 for the first detail view etc.
 * @param {string[]} searchStrings - Array of strings containing the user input of the modal (if this does not work inspect the header element of the column and extract information from the title attribute)
 * @param {string[]} totalNumColumns - total number of columns that are expected after adding them
 */
function checkScoreColLoaded(rankingId, searchStrings, totalNumColumns) {
    var searchStringsLower = searchStrings.map(function (string) { return string.toLowerCase(); });
    checkColCount(rankingId, totalNumColumns);
    cy.get("[data-testid=viewWrapper-" + rankingId + "] .tdp-view.lineup > div > main > header > article")
        .children()
        .filter(function (i, elem) {
        var label = elem.getElementsByClassName('lu-label')[0];
        var sublabel = elem.getElementsByClassName('lu-sublabel')[0];
        return searchStringsLower.every(function (s) { return elem.title.toLowerCase().includes(s) || label.innerHTML.toLowerCase().includes(s) || sublabel.innerHTML.toLowerCase().includes(s); });
    })
        // extract data-col-id and save it to variable column_id
        .invoke('attr', 'data-col-id')
        .as('column_id');
    // use variable column_id and check if first row contains "Loading"
    cy.get('@column_id').then(function (id) {
        return cy.get("[data-testid=viewWrapper-" + rankingId + "] .tdp-view.lineup > div > main > .le-body > [data-ranking=\"rank" + 0 + "\"] > div:nth-child(1) > [data-id=\"" + id + "\"]").should('not.contain', 'Loading');
    });
}
exports.checkScoreColLoaded = checkScoreColLoaded;
/**
 * Check if typing text in form input element has been completed
 * @param {string} input - input string that should be inserted
 * @param {string} selector - the selector of the element as returned by cypress studio
 */
function checkIfInputCompleted(input, selector) {
    cy.get(selector).invoke('val').then(function (text) {
        return text === input;
    });
}
exports.checkIfInputCompleted = checkIfInputCompleted;
/**
 * Scroll an Element into the center of the viewport (mainly for presentation purposes)
 * @param {string} selector - the selector of the element as returned by cypress studio
 * @param  {number} waitAfterScroll - specifies how long to wait after scrolling to an element
 */
function scrollElementIntoCenter(selector, waitAfterScroll) {
    if (selector === void 0) { selector = ""; }
    if (waitAfterScroll === void 0) { waitAfterScroll = 1000; }
    // calculate half of viewport height
    var offestTop = -Cypress.config().viewportHeight / 2;
    // Wee need to set the offset, because by default it is scrolled such that the element is on top
    cy.get(selector).scrollIntoView({ offset: { top: offestTop, left: 0 } });
    cy.wait(waitAfterScroll);
    return cy.get(selector);
}
exports.scrollElementIntoCenter = scrollElementIntoCenter;
/**
 * Submit Login Form of Ordino Public
 */
function loginPublic() {
    // Check if form is visible and the two inputs are not empty (so not to click too fast on the button)
    cy.get("[data-testid=phovea_security_store_generated-form-signin]").should('be.visible');
    cy.get('[data-testid=input-login-username]').invoke('val').should('not.be.empty');
    cy.get('[data-testid=input-login-password]').invoke('val').should('not.be.empty');
    // Add a small wait just for safety
    cy.wait(1000);
    cy.get('[data-testid=login-button]').click();
    // Check that login disappears
    cy.get('[data-testid=login-button]').should('not.be.visible');
}
exports.loginPublic = loginPublic;
/**
 * Waits for the specified api calls. Try using this if you need long waits at positions where many api calls are done.
 * @param {string[]} apiCalls - contains the strings to the api calls. They are logged out in the Cypress studio as GET requests. (ex: /api/idtype/Cellline/ or /api/idtype/Tissue/)
 */
function waitForApiCalls(apiCalls) {
    var waitVariables = [];
    apiCalls.forEach(function (apiCall) {
        cy.intercept(apiCall).as("" + apiCall);
        waitVariables.push("@" + apiCall);
    });
    cy.wait(waitVariables);
}
exports.waitForApiCalls = waitForApiCalls;
/**
 * Wait for the lineup table rows to be visible
 * @param {number} rankingId - ID of the ranking to search in, e.g. 0 for the initial ranking, 1 for the first detail view etc.
 */
function waitLineupReady(rankingId) {
    cy.get("[data-testid=viewWrapper-" + rankingId + "] .le-tr").should('be.visible');
}
exports.waitLineupReady = waitLineupReady;
