const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)
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

describe('login', () => {

  test('successful login with correct info', async () => {
    await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekrit' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect(res => 'token' in res.body && 'username' in res.body && 'name' in res.body)

  })

  test('returns 401 with wrong username', async () => {
    await api
      .post('/api/login')
      .send({ username: 'wronguser', password: 'sekrit' })
      .expect(401)
      .expect({ err: 'invalid username or password' })
  })

  test('returns 401 with wrong password', async () => {
    await api
      .post('/api/login')
      .send({ username: 'root', password: 'wrongpass' })
      .expect(401)
      .expect({ err: 'invalid username or password' })
  })

})

afterAll(() => {
  mongoose.connection.close()
})