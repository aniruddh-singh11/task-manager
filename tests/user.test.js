const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {user1ID, user1, setUpDatabase} = require('./fixtures/db')

beforeEach(setUpDatabase)

test('Should signup new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'ani',
        email: 'aniruddhs560@gmail.com',
        password: 'Green12345!'
    }).expect(201)

    //Assert db was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertions abt response
    expect(response.body).toMatchObject({
        user: {
            name: 'ani',
            email: 'aniruddhs560@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('Green12345!')
})

test('should login existing user', async() => {
    const response = await request(app).post('/users/login').send({
        email: user1.email,
        password: user1.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)

    expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not login non existing user', async() => {
    await request(app).post('/users/login').send({
        email: 'abc',
        password: user1.password
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile unauthenticated user', async() => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async() => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(user1ID)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async() => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(user1ID)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            name: "h",
        }).expect(200)
    const user = await User.findById(user1ID)
    expect(user.name).toEqual('h')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            location: "h",
        }).expect(400)
})