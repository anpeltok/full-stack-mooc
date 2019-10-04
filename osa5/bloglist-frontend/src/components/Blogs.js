import React from 'react'
import PropTypes from 'prop-types'

import Blog from './Blog'

const Blogs = ({ user, blogs, setBlogs, handleNotification }) => {

  return(
    <div className='blogs'>
      {blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            handleNotification={handleNotification}
            user={user} />
        )}
    </div>
  )
}

Blogs.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  handleNotification: PropTypes.func.isRequired
}

export default Blogs