class loginPage {
    visitPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    inputUser(username) {
        cy.get('[name="username"]').clear().type(username)
    }

    inputPass(password) {
        cy.get('[name="password"]').clear().type(password) 
    }

    loginButton() {
        cy.get('.oxd-button').click()
    }

    verifyLogin() {
        cy.url().should('include','dashboard')
    }

    verifyEmptyField() {
    cy.get('[name="username"]').should('have.value', "")
    cy.get('[name="password"]').should('have.value', "")
    }

    clickLoginMultiple() {
    cy.get('.oxd-button').then(($btn) => {
        for (let i = 0; i < 5; i++) {
        $btn.click()
        }
      })
    }
    
    verifyInvalidCredentials() {
    cy.get('.oxd-alert-content-text')
    .should('be.visible')
    .and('contain', 'Invalid credentials')
    }
    
    verifyRequired() {
    cy.contains('Required').should('be.visible')
    }

}

export default new loginPage
        
        
