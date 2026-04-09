import loginPage from "../../support/loginpage"
import loginData from "../../fixtures/loginData.json"

describe('Login OrangeHRM - POM', () => {

  beforeEach(() => {
    loginPage.visitPage()
  })

  it('TC-001 Login tanpa username dan password', () => {
    loginPage.loginButton()
    loginPage.verifyRequired()
  }) 

  it('TC-002 Login dengan username huruf besar', () => {
    loginPage.inputUser(loginData.invalidUserBesar)
    loginPage.inputPass(loginData.validPass)
    loginPage.loginButton()
    loginPage.verifyLogin()
  }) 

  it('TC-003 Login dengan password huruf besar', () => {
    loginPage.inputUser(loginData.validUser)
    loginPage.inputPass(loginData.invalidPassBesar)
    loginPage.loginButton()
    loginPage.verifyInvalidCredentials()
  }) 

  it('TC-004 Login dengan spasi setelah username', () => {
    loginPage.inputUser(loginData.invalidUserspace)
    loginPage.inputPass(loginData.validPass)
    loginPage.loginButton() //Sistem tetap menerima karena kemungkinan trim input
    loginPage.verifyLogin()
  }) 

  it('TC-005 Refresh halaman saat login', () => {
    loginPage.inputUser(loginData.validUser)
    loginPage.inputPass(loginData.validPass)
    cy.reload()
    loginPage.verifyEmptyField()
  }) 

  it('TC-006 Session login berhasil dibuat', () => {     
      loginPage.inputUser(loginData.validUser)
      loginPage.inputPass(loginData.validPass)
      loginPage.loginButton()
      loginPage.verifyLogin()
      // Session terbentuk secara otomatis saat login berhasil, jadi saya validasi melalui redirect ke dashboard
  })

  it('TC-007 Login dengan username mengandung angka', () => {
    loginPage.inputUser(loginData.invalidUserAngka)
    loginPage.inputPass(loginData.validPass)
    loginPage.loginButton()
    loginPage.verifyInvalidCredentials()
  }) 

  it('TC-008 Login dengan username salah', () => {
    loginPage.inputUser(loginData.invalidUserS)
    loginPage.inputPass(loginData.validPass)
    loginPage.loginButton()
    loginPage.verifyInvalidCredentials()
  }) 

it('TC-009 Klik login berkali-kali', () => {
    loginPage.inputUser(loginData.validUser)
    loginPage.inputPass(loginData.validPass)
    loginPage.clickLoginMultiple(5)
    loginPage.verifyLogin()
  }) 



})