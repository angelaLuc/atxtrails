// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('seedDataAndVisit', (seedData = 'fixture:trail-test-data') => {
    cy.server();
    cy.route('GET', 'resource/jdwm-wfps.json', seedData).as('loadtrails');
    cy.visit('/');
    cy.wait('@loadtrails');
});

Cypress.Commands.add('selectVioletCrown', () => {
    cy.get('.map-reactleaflet').should('have.length', 1);
    cy.get('[data-testid=trail-filter-panel]').should('not.be.visible');
    cy.get('#trail-name-filter-id').click();
    cy.get('[data-testid=trail-filter-panel]').should('be.visible');
    //cy.get('[data-testid=dropdown-select]').should('contain', 'Show All');
    cy.get('[data-testid=dropdown-select]').clear().type('VIOLET CROWN TRAIL');
    cy.get('[data-testid=dropdown-select]').should('have.value', 'VIOLET CROWN TRAIL');
    cy.get('#trail-name-filter-id').should('have.class', 'green-filter-button');
    cy.get('#trail-name-filter-id').click();
    cy.get('[data-testid=trail-filter-panel]').should('not.be.visible');
    cy.get('#trail-name-filter-id').should('have.class', 'green-filter-button');
});
