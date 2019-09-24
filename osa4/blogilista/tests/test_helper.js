const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Blogin nimi',
    author: 'Blo. G. Writer',
    url: 'www.blogiontaalla.com',
    likes: 15
  },
  {
    title: 'Blogi Kaksi',
    author: 'Blo. G. Writer',
    url: 'www.taallaonblogeja.com/blogi',
    likes: 2
  },
  {
    title: 'Blog three',
    author: 'Eino Leino',
    url: 'www.heretherebeblogs.com/blog',
    likes: 82
  },
  {
    title: 'Blog four',
    author: 'Blo. G. Writer',
    url: 'www.blogs.com/',
    likes: 920
  },
  {
    title: 'My blog post',
    author: 'Eino Leino',
    url: 'www.blogisivusto.com/blogi123',
    likes: 50
  },
  {
    title: 'Blogi 15',
    author: 'Eino Leino',
    url: 'www.einoleinonblogit.com/4',
    likes: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'temp',
    author: 'temp',
    url: 'temp',
    likes: 0
  })

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}