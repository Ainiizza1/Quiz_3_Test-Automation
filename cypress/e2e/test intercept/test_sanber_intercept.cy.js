describe('Scenario Verifikasi Fungsi Login', () => {
    it('TC01-Login dengan username valid & password valid', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

        cy.get('[name="username"]').type('Admin')
        cy.get('[name="password"]').type('admin123')
        
        cy.intercept('Get','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('dashboard')
        
        cy.get('button[type="submit"]').click()
        cy.wait('@dashboard').its('response.statusCode').should('eq',200)
        cy.url().should('include', 'dashboard')
    })
})

//ini percobaan dengan intercept