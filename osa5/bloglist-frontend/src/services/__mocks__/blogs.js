const blogs = [
  {
    id: '229034820934890283fj0',
    title: 'Blog one',
    author: 'Blo G. Writer',
    url: 'www.blogurl.com',
    likes: 0,
    user: {
      _id: '0239580923fjkjdfwe02394',
      username: 'aparat',
      name: 'Andrea Peltokorpi'
    }
  },
  {
    id: '229034820934890283fsj',
    title: 'Blog two',
    author: 'Eino Leino',
    url: 'www.blogsgohere.com',
    likes: 1337,
    user: {
      _id: '0928340982304lajfa933',
      username: 'aparaatti',
      name: 'Antti Peltokorpi'
    }
  },
  {
    id: '229034820934890283f29',
    title: 'Blog three',
    author: 'Writer of Blogs',
    url: 'www.bestblogs.com',
    likes: 57,
    user: {
      _id: '0239580923fjkjdfwe02394',
      username: 'aparat',
      name: 'Andrea Peltokorpi'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

let token = null

const setToken = newToken => {
  token = newToken
}

export default { getAll, setToken, token }