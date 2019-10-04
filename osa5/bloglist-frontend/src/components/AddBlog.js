import React from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'

import { useField } from '../hooks'

const AddBlog = ({ blogs, setBlogs, handleNotification, blogFormRef }) => {

  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const resetFields = () => {
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  const handleAddBlog = async event => {
    event.preventDefault()

    blogFormRef.current.toggleVisibility()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    try{

      const blog = await blogService.create(newBlog)

      resetFields()

      setBlogs(blogs.concat(blog))

      handleNotification('success', `'${title.value}' by ${author.value} added`)

    } catch(exception){

      resetFields()

      handleNotification('error', 'Blog invalid')
    }
  }

  return (
    <div>
      <h2>Add blogs</h2>
      <form className='blogForm' onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            className='blogTitle'
            name='Title'
            {...title}
          />
        </div>
        <div>
          author:
          <input
            className='blogAuthor'
            name='Author'
            {...author}
          />
        </div>
        <div>
          url:
          <input
            className='blogUrl'
            name='Url'
            {...url}
          />
        </div>
        <button className='blogSubmit' type='submit' >add</button>
      </form>
    </div>
  )
}

AddBlog.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  handleNotification: PropTypes.func.isRequired,
  blogFormRef: PropTypes.object.isRequired
}

export default AddBlog