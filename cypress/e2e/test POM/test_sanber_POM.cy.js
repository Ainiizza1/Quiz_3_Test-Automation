import loginPage2 from "../../support/loginpage2"
import loginData2 from "../../fixtures/loginData2.json"

describe('Scenario Verifikasi Fungsi Login', () => {
    it('TC001-Login dengan username valid & password valid', () => {
        // cy.visit('https://www.saucedemo.com/')
        // cy.get('#username').type('standard_user')
        // cy.get('#password').type('secret_sauce')
        // cy.get('.btn_action').click()
        // cy.url().should('include', 'inventory')

        loginPage2.visitPage()
        loginPage2.inputUsername(loginData2.validUsername)
        loginPage2.inputPassword(loginData2.validPassword)
        loginPage2.loginButton()
        loginPage2.verifyLogin()
    })  

    // it('TC002-Login dengan username invalid & password invalid', () => {
    //     loginPage2.visitPage()
    //     loginPage2.inputUsername(loginData2.invalidUsername)
    //     loginPage2.inputPassword(loginData2.invalidPassword)
    //     loginPage2.loginButton()
    // })  

    // it('TC003-Login dengan username invalid & password valid', () => {
    //     loginPage.visitPage()
    //     loginPage.inputUsername(loginData.invalidUsername)
    //     loginPage.inputPassword(loginData.validPassword)
    //     loginPage.loginButton()
    // })  

    it('TC004-Login dengan username valid & password invalid', () => {
        loginPage2.visitPage()
        loginPage2.inputUsername(loginData2.lockedOutUsername)
        // loginPage2.inputUsername(loginData2.validUsername)
        loginPage2.inputPassword(loginData2.invalidPassword)
        loginPage2.loginButton()
    })  
    
})