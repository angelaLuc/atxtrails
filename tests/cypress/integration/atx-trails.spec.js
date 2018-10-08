context('ATX Urban Trails tests - call through to real api', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('Should have a list of results', () => {
        cy.get('.map-reactleaflet').should('have.length', 1)
    })
});

describe('ATX Urban Trails test - mocked data', () => {
    it('Should return an empty list of trails', () => {
        cy.server();
        cy.route('GET', 'resource/jdwm-wfps.json', []).as('trails');
        cy.visit('/');
        cy.wait('@trails');
        cy.get('.map-reactleaflet').should('not.be.visible');
        cy.get('[data-testid=error-message]').should('be.visible');
    });

    it('Should load mocked data', () => {
        cy.seedDataAndVisit();
        cy.get('.map-reactleaflet').should('have.length', 1);
        cy.get('[data-testid=trail-filter-panel]').should('not.be.visible');
    });

    it('Open Trail List panel - default show all', () => {
        cy.seedDataAndVisit();
        cy.get('.map-reactleaflet').should('have.length', 1);
        cy.get('[data-testid=trail-filter-panel]').should('not.be.visible');
        cy.get('#trail-name-filter-id').click();
        cy.get('[data-testid=trail-filter-panel]').should('be.visible');
        cy.get('[data-testid=dropdown-select]').should('have.value', 'Show All');
        cy.get('#trail-name-filter-id').should('not.have.class', 'green-filter-button');
    });

    it('Open Trail List panel - select violet crown', () => {
        cy.seedDataAndVisit();
        cy.get('.map-reactleaflet').should('have.length', 1);
        cy.get('#trail-name-filter-id').click();
        cy.get('[data-testid=dropdown-select]').should('contain', 'Show All');
        cy.get('select').select('VIOLET CROWN TRAIL');
        cy.get('[data-testid=dropdown-select]').should('have.value', 'VIOLET CROWN TRAIL');
        cy.get('#trail-name-filter-id').should('have.class', 'green-filter-button');
    });

    it('Open Trail List panel - select violet crown - toggle filter pane', () => {
        cy.seedDataAndVisit();
        cy.selectVioletCrown();
        cy.get('#trail-name-filter-id').click(); // re-open panel
        cy.get('[data-testid=dropdown-select]').should('have.value', 'VIOLET CROWN TRAIL'); // check selected
    });

    it('Open Trail List panel - select violet crown - select red line trail', () => {
        cy.seedDataAndVisit();
        cy.selectVioletCrown();
        cy.get('#trail-name-filter-id').click(); // re-open panel
        cy.get('[data-testid=dropdown-select]').should('have.value', 'VIOLET CROWN TRAIL'); // check selected
        cy.get('select').select('RED LINE TRAIL');
        cy.get('[data-testid=dropdown-select]').should('have.value', 'RED LINE TRAIL');
        cy.get('#trail-name-filter-id').should('have.class', 'green-filter-button');
        cy.get('#trail-name-filter-id').click(); // close panel
        cy.get('[data-testid=trail-filter-panel]').should('not.be.visible');
        cy.get('#trail-name-filter-id').click(); // close panel
        cy.get('[data-testid=trail-filter-panel]').should('be.visible');
    });

    it('Open Trail List panel - select violet crown - reset data', () => {
        cy.seedDataAndVisit();
        cy.selectVioletCrown();
        cy.get('#trail-name-filter-id').click(); // re-open panel
        cy.get('[data-testid=trail-filter-panel]').should('be.visible');
        cy.get('[data-testid=dropdown-select]').should('have.value', 'VIOLET CROWN TRAIL'); // check selected
        cy.get('[data-testid=refresh-map-control]').click();
        cy.wait('@loadtrails');
        cy.get('[data-testid=trail-filter-panel]').should('not.be.visible');
        cy.get('#trail-name-filter-id').should('not.have.class', 'green-filter-button');
        cy.get('#trail-name-filter-id').click(); // re-open panel
        cy.get('[data-testid=dropdown-select]').should('contain', 'Show All');
    });

    it('Test github link visible', () => {
        cy.seedDataAndVisit();
        cy.get('.map-reactleaflet').should('have.length', 1);
        cy.get('[data-testid=trail-filter-panel]').should('not.be.visible');
        cy.get('[data-testid=github-link]').should('be.visible');
    });
});
