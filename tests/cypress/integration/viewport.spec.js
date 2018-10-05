/**
 * This suite is just for visual checking layout (no tests)
 */
context.skip('Viewport', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.wait(1000); // let initial data load
    });
    it('cy.viewport() - set the viewport size and dimension', () => {
        // cy.get('#navbar').should('be.visible')
        // cy.viewport(320, 480)
        //
        // // the navbar should have collapse since our screen is smaller
        // cy.get('#navbar').should('not.be.visible')
        // cy.get('.navbar-toggle').should('be.visible').click()
        // cy.get('.nav').find('a').should('be.visible')

        // lets see what our app looks like on a super large screen
        cy.viewport(2999, 2999)
        cy.wait(200)
        // cy.viewport() accepts a set of preset sizes
        // to easily set the screen to a device's width and height

        // We added a cy.wait() between each viewport change so you can see
        // the change otherwise it is a little too fast to see :)

        cy.viewport('macbook-15')
        cy.wait(200)
        cy.viewport('macbook-13')
        cy.wait(200)
        cy.viewport('macbook-11')
        cy.wait(200)
        cy.viewport('ipad-2')
        cy.wait(200)
        cy.viewport('ipad-mini')
        cy.wait(200)
        cy.viewport('iphone-6+')
        cy.wait(200)
        cy.viewport('iphone-6')
        cy.wait(200)
        cy.viewport('iphone-5')
        cy.wait(200)
        cy.viewport('iphone-4')
        cy.wait(200)
        cy.viewport('iphone-3')
        cy.wait(200)

        // cy.viewport() accepts an orientation for all presets
        // the default orientation is 'portrait'
        cy.viewport('ipad-2', 'portrait')
        cy.wait(200)
        cy.viewport('iphone-4', 'landscape')
        cy.wait(200)
    });
});
