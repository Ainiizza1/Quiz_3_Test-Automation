class loginPage2 {
    visitPage() {
        cy.visit('https://www.saucedemo.com')
    }
    inputUsername(username) {
        cy.get('#user-name').type(username)
    }
    inputPassword(password) {
        cy.get('#password').type(password)   
    }
    loginButton() {
        cy.get('.btn_action').click()
    }
    verifyLogin() {
        cy.url().should('include','inventory')
    }    
}
export default new loginPage2
        
        
