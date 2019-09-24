
const dummy = _blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((sum, item) => {
    return sum + item.likes
  }, 0)
}

const favoriteBlog = blogs => {
  if(blogs.length === 0){
    return null
  }
  return blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current
  })
}

const mostBlogs = blogs => {
  if(blogs.length === 0){
    return null
  }
  const authors = blogs.map(blog => blog.author)
  let max = 0
  let maxAuthor = ''
  authors.forEach(author => {
    const count = blogs.filter(blog => blog.author === author).length
    if(count > max){
      max = count
      maxAuthor = author
    }
  })
  return {
    author: maxAuthor,
    blogs: max
  }
}

const mostLikes = blogs => {
  if(blogs.length === 0){
    return null
  }
  const authors = blogs.map(blog => blog.author)
  let max = 0
  let maxAuthor = ''
  authors.forEach(author => {
    const count = totalLikes(blogs.filter(blog => blog.author === author))

    if(count > max){
      max = count
      maxAuthor = author
    }
  })
  return {
    author: maxAuthor,
    likes: max
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}