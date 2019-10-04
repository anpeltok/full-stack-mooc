import React, { useState } from 'react'
import PropTypes from 'prop-types'

import blogServices from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, handleNotification, user }) => {

  const [clicked, setClicked] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5
  }

  const handleLike = () => async e => {
    e.stopPropagation()
    const newBlog = Object.assign({}, blog)
    newBlog.likes++

    await blogServices.update(blog.id, newBlog)

    setBlogs(blogs.map(blog => blog.id === newBlog.id ? newBlog : blog))
  }

  const handleDelete = () => async e => {
    e.stopPropagation()

    try{
      if(window.confirm(`Are you sure you want to remove '${blog.title}' by ${blog.author}`)){
        const removeId = blog.id
        await blogServices.remove(removeId)

        setBlogs(blogs.filter(blog => blog.id !== removeId))

        handleNotification('success', `'${blog.title}' by ${blog.author} succesfully deleted`)
      }
    } catch(exception){
      handleNotification('error', 'You can only delete blogs added by you')
    }
  }

  const toggleClicked = () => {
    setClicked(!clicked)
  }

  return(
    <div className='blog' style={blogStyle} onClick = { () => toggleClicked() }>
      <div className='titleAndAuthor'>
        {blog.title} by {blog.author}
      </div>

      {
        clicked ?
          <div className='optionalInfo'>
            <div className='url'>
              <a href={`//${blog.url}`} target="_blank" rel="noopener noreferrer">{blog.url}</a>
            </div>
            <div className='likes'>
              {blog.likes} likes
              <button className='likeButton' onClick={ handleLike() }>like</button>
            </div>
            <div className='addedBy'>
                Added by {blog.user.name}
            </div>

            {
              user.username === blog.user.username ?
                <div>
                  <button className='deleteButton' onClick={handleDelete()}>delete</button>
                </div> :
                null
            }
          </div> :
          null
      }

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  handleNotification: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog