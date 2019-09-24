const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)
const helper = require('./test_helper')
jest.setTimeout(30000)

beforeEach(async () => {
  await User.deleteMany({})
  let user = { username: 'root', name: 'Root User', password: 'sekrit' }
  await api
    .post('/api/users')
    .send(user)

  user = { username: 'seconduser', name: 'Second User', password: 'sekrit' }
  await api
    .post('/api/users')
    .send(user)
})

describe('getting all users from db', () => {

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('users have property named "id"', async () => {
    const res = await helper.usersInDb()

    res.forEach(user => expect(user.id).toBeDefined())
  })
})

describe('adding users to db', () => {

  test('can create new user with fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'user_name',
      name: 'User Name',
      password: 'sekrit'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    expect(usersAtEnd.map(user => user.username)).toContain(newUser.username)
  })

  test('can\'t post duplicate usernames', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: usersAtStart[0].username,
      name: 'User Name',
      password: 'sekrit'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('can\'t post user with no password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'user_name',
      name: 'User Name',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ err: 'invalid password' })

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('can\'t post user with too short password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'user_name',
      name: 'User Name',
      password: 'pw'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ err: 'invalid password' })

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toEqual(usersAtStart)
  })

})

afterAll(() => {
  mongoose.connection.close()
})