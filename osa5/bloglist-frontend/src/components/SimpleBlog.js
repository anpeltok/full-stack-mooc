import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className='blog'>
    <div className='titleAndAuthor'>
      {blog.title} {blog.author}
    </div>
    <div className='likes'>
      blog had {blog.likes} likes
      <button className='like' onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog