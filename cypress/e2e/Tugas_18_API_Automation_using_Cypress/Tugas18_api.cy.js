describe('Reqres API Automation', () => {

    const baseUrl = 'https://reqres.in/api'
    const apiKey = 'pub_f15315bf9533fd914d4243b62bd22270b9f594b2931510ed346a6b6cb15dc0a0' // <-- ganti dengan pub_xxxxx

    // helper biar clean
    const apiRequest = (method, endpoint, body = null) => {
        return cy.request({
            method,
            url: `${baseUrl}${endpoint}`,
            headers: {
                'x-api-key': apiKey
            },
            body,
            failOnStatusCode: false
        })
    }

    // 1. GET list users
    it('GET - List Users', () => {
        apiRequest('GET', '/users?page=2')
            .then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body.page).to.eq(2)
                expect(res.body.data.length).to.be.greaterThan(0)
            })
    })

    // 2. GET single user
    it('GET - Single User', () => {
        apiRequest('GET', '/users/2')
            .then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body.data.id).to.eq(2)
            })
    })

    // 3. GET user not found
    it('GET - User Not Found', () => {
        apiRequest('GET', '/users/23')
            .then((res) => {
                expect(res.status).to.eq(404)
            })
    })

    // 4. POST create user
    it('POST - Create User', () => {
        apiRequest('POST', '/users', {
            name: "Aini",
            job: "QA Engineer"
        }).then((res) => {
            expect(res.status).to.eq(201)
            expect(res.body.name).to.eq("Aini")
        })
    })

    // 5. PUT update user
    it('PUT - Update User', () => {
        apiRequest('PUT', '/users/2', {
            name: "Aini Updated",
            job: "Senior QA"
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.name).to.eq("Aini Updated")
        })
    })

    // 6. PATCH update user
    it('PATCH - Partial Update', () => {
        apiRequest('PATCH', '/users/2', {
            job: "QA Lead"
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.job).to.eq("QA Lead")
        })
    })

    // 7. DELETE user
    it('DELETE - User', () => {
        apiRequest('DELETE', '/users/2')
            .then((res) => {
                expect(res.status).to.eq(204)
            })
    })

    // 8. POST login success
    it('POST - Login Success', () => {
        apiRequest('POST', '/login', {
            email: "eve.holt@reqres.in",
            password: "cityslicka"
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property('token')
        })
    })

    // 9. POST login failed
    it('POST - Login Failed', () => {
        apiRequest('POST', '/login', {
            email: "peter@klaven"
        }).then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body).to.have.property('error')
        })
    })

})