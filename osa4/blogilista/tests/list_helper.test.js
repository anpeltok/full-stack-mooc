const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes
const helper = require('./test_helper')

const blogs = helper.initialBlogs.concat()

const blogsOne = blogs.slice(0,1)
const blogsTwo = blogs.slice(0,2)
const blogsEmpty = []

describe('dummy', () => {
  test('dummy returns one', () => {
    const result = dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {

  test('no blogs', () => {

    const result = totalLikes(blogsEmpty)
    expect(result).toBe(0)
  })

  test('one blog', () => {

    const result = totalLikes(blogsOne)
    expect(result).toBe(15)
  })

  test('two blogs', () => {

    const result = totalLikes(blogsTwo)
    expect(result).toBe(17)
  })

  test('many blogs', () => {

    const result = totalLikes(blogs)
    expect(result).toBe(1069)
  })
})

describe('blog with most likes', () => {

  test('no blogs', () => {

    const result = favoriteBlog(blogsEmpty)
    expect(result).toEqual(null)
  })

  test('one blog', () => {

    const result = favoriteBlog(blogsOne)
    expect(result).toEqual(
      {
        title: 'Blogin nimi',
        author: 'Blo. G. Writer',
        url: 'www.blogiontaalla.com',
        likes: 15
      }
    )
  })

  test('two blogs', () => {

    const result = favoriteBlog(blogsTwo)
    expect(result).toEqual(
      {
        title: 'Blogin nimi',
        author: 'Blo. G. Writer',
        url: 'www.blogiontaalla.com',
        likes: 15
      }
    )
  })

  test('many blogs', () => {

    const result = favoriteBlog(blogs)
    expect(result).toEqual(
      {
        title: 'Blog four',
        author: 'Blo. G. Writer',
        url: 'www.blogs.com/',
        likes: 920
      }
    )
  })
})

describe('author with most blogs', () => {

  test('no blogs', () => {

    const result = mostBlogs(blogsEmpty)
    expect(result).toEqual(null)
  })

  test('one blog', () => {

    const result = mostBlogs(blogsOne)
    expect(result).toEqual(
      {
        author: 'Blo. G. Writer',
        blogs: 1
      }
    )
  })

  test('many blogs', () => {

    const result = mostBlogs(blogs)
    expect(result).toEqual(
      {
        author: 'Blo. G. Writer',
        blogs: 3
      }
    )
  })

})

describe('author with most likes', () => {

  test('no blogs', () => {

    const result = mostBlogs(blogsEmpty)
    expect(result).toEqual(null)
  })

  test('one blog', () => {

    const result = mostLikes(blogsOne)
    expect(result).toEqual(
      {
        author: 'Blo. G. Writer',
        likes: 15
      }
    )
  })

  test('many blogs', () => {

    const result = mostLikes(blogs)
    expect(result).toEqual(
      {
        author: 'Blo. G. Writer',
        likes: 937
      }
    )
  })

})