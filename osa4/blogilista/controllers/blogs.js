const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res, next) => {
  try{
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })

    res.json(blogs.map(blog => blog.toJSON()))
  }catch(exception){
    next(exception)
  }
})

blogsRouter.post('/', async (req, res, next) => {

  const body = req.body

  try{
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if(!decodedToken.id){
      return res.status(401).json({ err: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    const blogWithUser = await Blog.findById(savedBlog.id).populate('user', { username: 1, name: 1, id: 1 })
    await user.save()

    res.status(201).json(blogWithUser.toJSON())

  }catch(exception){
    next(exception)
  }

})

blogsRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  const blog = await Blog.findById(id)

  if(!blog){
    return res.status(400).json({ err: 'wrong id' })
  }

  const userId = blog.user
  const user = await User.findById(userId)

  try{
    const decodedToken = await jwt.verify(req.token, process.env.SECRET)

    if(!decodedToken.id){
      return res.status(401).json({ err: 'token missing or invalid' })
    }

    if(blog.user.toString() !== decodedToken.id){
      return res.status(401).json({ err: 'wrong user' })
    }

    await Blog.findByIdAndDelete(id)

    // Deleting blog from user's blog array
    const updatedUser = {
      username: user.username,
      name: user.name,
      passwordHash: user.passwordHash,
      blogs: user.blogs.filter(user => user.toString() !== id)
    }

    await User.findByIdAndUpdate(user.id, updatedUser)

    res.status(204).end()

  }catch(exception){
    next(exception)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try{
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.status(200).json(updatedBlog.toJSON())
  }catch(exception){
    next(exception)
  }
})

module.exports = blogsRouter