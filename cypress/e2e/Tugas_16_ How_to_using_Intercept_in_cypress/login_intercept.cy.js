describe('Login OrangeHRM - Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('TC-001 Login tanpa username dan password', () => {
    cy.intercept('POST', '**/auth/login').as('emptyLogin')
    cy.get('button[type="submit"]').click()

    cy.get('@emptyLogin.all').should('have.length', 0)
    cy.contains('Required').should('be.visible')
  })

  it('TC-002 Login dengan username huruf besar', () => {
    cy.intercept('GET','**/api/v2/dashboard/shortcuts').as('hurufBesar')

    cy.get('[name="username"]').type('ADMIN')
    cy.get('[name="password"]').type('admin123')
    
    cy.get('button[type="submit"]').click()
    cy.wait('@hurufBesar').its('response.statusCode').should('eq',200)
    cy.url().should('include', 'dashboard')
  })

  it('TC-003 Login dengan password huruf besar', () => {
    cy.intercept('POST', '**/auth/validate').as('passwordBesar')

    cy.get('[name="username"]').type('admin')
    cy.get('[name="password"]').type('ADMIN123')
    cy.get('button[type="submit"]').click()

    cy.wait('@passwordBesar').its('response.statusCode').should('be.oneOf', [400, 401, 302])
    cy.contains('Invalid credentials').should('be.visible')
  })
  
  it('TC-004 Login dengan spasi setelah username', () => {
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index').as('denganSpasi')

    cy.get('[name="username"]').type('Admin ')
    cy.get('[name="password"]').type('admin123')

    cy.get('button[type="submit"]').click()
    cy.wait('@denganSpasi').its('response.statusCode').should('eq',200)
    cy.url().should('include', 'dashboard')
  })

  it('TC-005 Refresh halaman saat login', () => {
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/subunit').as('denganRefresh')

    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('admin123')
    
    cy.reload()
    cy.get('[name="username"]').should('have.value', '')
    cy.get('[name="password"]').should('have.value', '')
  })

  it('TC-006 Session login berhasil dibuat', () => {
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/locations').as('denganSession')

    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('admin123')

  
    cy.get('button[type="submit"]').click()
    cy.wait('@denganSession').its('response.statusCode').should('eq',200)
    cy.get('.oxd-userdropdown-tab').should('be.visible') 
    // Session terbentuk secara otomatis saat login berhasil, jadi saya validasi melalui redirect ke dashboard.
    
  }) 

  it('TC-007 Login dengan username mengandung angka', () => {
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').as('usernameAngka')

    cy.get('[name="username"]').type('Admin123')
    cy.get('[name="password"]').type('admin123')

    cy.get('button[type="submit"]').click()
    cy.wait('@usernameAngka').its('response.statusCode').should('eq',200)
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-008 Login dengan username salah', () => {
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('usernameSalah')

    cy.get('[name="username"]').type('Admins')
    cy.get('[name="password"]').type('admin123')
    
    cy.get('button[type="submit"]').click()
    cy.wait('@usernameSalah').its('response.statusCode').should('eq',304)
    cy.contains('Invalid credentials').should('be.visible')
  })

it('TC-009 Klik login berkali-kali', () => {
  cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/subunit').as('banyakKlik')

  cy.get('[name="username"]').type('Admin')
  cy.get('[name="password"]').type('admin123')
  cy.get('.oxd-button').then(($btn) => {
      $btn.click()
      $btn.click()
      $btn.click()
      $btn.click()
      $btn.click()
    })

    cy.wait('@banyakKlik')
    cy.url().should('include', 'dashboard')
  })

})
