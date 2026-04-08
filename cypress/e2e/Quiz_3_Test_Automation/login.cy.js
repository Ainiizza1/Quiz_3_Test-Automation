describe('Login OrangeHRM', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('TC-001 Login tanpa username dan password', () => {
    cy.get('.oxd-button').click()
    cy.contains('Required').should('be.visible')
  })

  it('TC-002 Login dengan username huruf besar', () => {
    cy.get('[name="username"]').should('be.visible').type('ADMIN')
    cy.get('[name="password"]').type('admin123')
    cy.get('.oxd-button').click()
    cy.url().should('include', 'dashboard')
  })

  it('TC-003 Login dengan password huruf besar', () => {
    cy.get('[name="username"]').type('admin')
    cy.get('[name="password"]').type('ADMIN123')
    cy.get('.oxd-button').click()
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-004 Login dengan spasi setelah username', () => {
    cy.get('[name="username"]').type('Admin ')
    cy.get('[name="password"]').type('admin123')
    cy.get('.oxd-button').click()  //Sistem tetap menerima karena kemungkinan trim input
    cy.url().should('include', 'dashboard')
  })

  it('TC-005 Refresh halaman saat login', () => {
    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('admin123')
    cy.reload()
    cy.get('[name="username"]').should('have.value', '')
    cy.get('[name="password"]').should('have.value', '')
  })

  it('TC-006 Session login berhasil dibuat', () => {
    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('admin123')
    cy.get('.oxd-button').click()
    cy.get('.oxd-userdropdown-tab').should('be.visible') 
    // Session terbentuk secara otomatis saat login berhasil, jadi saya validasi melalui redirect ke dashboard.
    
  })

  it('TC-007 Login dengan username mengandung angka', () => {
    cy.get('[name="username"]').type('Admin123')
    cy.get('[name="password"]').type('admin123')
    cy.get('.oxd-button').click()
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-008 Login dengan username salah', () => {
    cy.get('[name="username"]').type('Admins')
    cy.get('[name="password"]').type('admin123')
    cy.get('.oxd-button').click()
    cy.contains('Invalid credentials').should('be.visible')
  })

it('TC-009 Klik login berkali-kali', () => {
  cy.get('[name="username"]').type('Admin')
  cy.get('[name="password"]').type('admin123')
  cy.get('.oxd-button').then(($btn) => {
      $btn.click()
      $btn.click()
      $btn.click()
      $btn.click()
      $btn.click()
    })
    cy.url().should('include', 'dashboard')
  })

})