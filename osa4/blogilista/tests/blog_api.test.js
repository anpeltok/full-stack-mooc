const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
const helper = require('./test_helper')
jest.setTimeout(30000)
let token = null

const loginUser = async (username, password) => {
  let token = null

  await api
    .post('/api/login')
    .send({ username, password })
    .expect(res => token = res.body.token)

  return token

}

beforeEach(async () => {
  token = await loginUser('root', 'sekrit')

  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(blog)
    )
  await Promise.all(blogObjects)

})

describe('getting blogs from api', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct number of blogs is returned', async () => {
    const res = await helper.blogsInDb()

    expect(res.length).toBe(helper.initialBlogs.length)
  })

  test('blogs have property named "id"', async () => {
    const res = await helper.blogsInDb()

    res.forEach(blog => expect(blog.id).toBeDefined())
  })
})

describe('adding blogs to api', () => {

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Author of New Blog',
      url: 'www.urlofnewblog.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    expect(blogsAtEnd.map(blog => blog.title)).toContain(newBlog.title)
  })

  test('likes defaults to zero', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Author of New Blog',
      url: 'www.urlofnewblog.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)

    expect(addedBlog.likes).toBe(0)
  })

  test('no title returns 400', async () => {
    const newBlog = {
      author: 'Author of New Blog',
      url: 'www.urlofnewblog.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })

  test('no url returns 400', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Author of New Blog',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })

  test('can\'t post blog without login', async () => {

    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'New Blog',
      author: 'Author of New Blog',
      url: 'www.urlofnewblog.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
      .expect({ err: 'invalid token' })

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toEqual(blogsAtStart)

  })
})

describe('deleting blog from api', () => {

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const removeBlog = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${removeBlog.id}`)
      .set('Authorization', 'bearer ' + token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

    expect(blogsAtEnd.map(blog => blog.title)).not.toContain(removeBlog.title)
  })

  test('deleted blog is removed from user\'s blogs', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const removeBlog = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${removeBlog.id}`)
      .set('Authorization', 'bearer ' + token)
      .expect(204)

    const user = await User.findById(removeBlog.user)

    expect(user.blogs.toString()).not.toContain(removeBlog.id)
  })

  test('deleting blog with wrong id returns 400', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const deleteId = await helper.nonExistingId()

    await api
      .delete(`/api/blogs/${deleteId}`)
      .expect(400)
      .expect({ err: 'wrong id' })

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })

  test('can\'t delete without token', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const removeBlog = blogsAtStart[0]
    token = await loginUser('root', 'sekrit')

    await api
      .delete(`/api/blogs/${removeBlog.id}`)
      .expect(401)
      .expect({ err: 'invalid token' })

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toEqual(blogsAtStart)
  })

  test('can\'t delete with wrong user', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const removeBlog = blogsAtStart[0]
    token = await loginUser('seconduser', 'sekrit')

    await api
      .delete(`/api/blogs/${removeBlog.id}`)
      .set('Authorization', 'bearer ' + token)
      .expect(401)
      .expect({ err: 'wrong user' })

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toEqual(blogsAtStart)
  })
})

describe('updating blog in api', () => {

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToEdit = blogsAtStart[0]
    const id = blogToEdit.id

    const newBlog = {
      title: blogToEdit.title,
      author: blogToEdit.author,
      url: blogToEdit.url,
      likes: 1337
    }

    await api
      .put(`/api/blogs/${id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)

    const updatedBlog = blogsAtEnd.find(blog => blog.id.equals(id))
    expect(updatedBlog.likes).toBe(newBlog.likes)
  })

  test('updating with wrong id returns 400', async () => {
    const id = helper.nonExistingId()
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'Title',
      author: 'Author',
      url: 'Url',
      likes: 1337
    }

    await api
      .put(`/api/blogs/${id}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toEqual(blogsAtStart)
  })

})

afterAll(() => {
  mongoose.connection.close()
})