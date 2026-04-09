class loginPage {
    visitPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    inputUser(username) {
        cy.get('[name="username"]').type(username)
    }

    inputPass(password) {
        cy.get('[name="password"]').type(password)   
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

    clickLoginMultiple(times = 3) {
    cy.get('.oxd-button').click({ multiple: true })
    }


}

export default new loginPage
        
        
