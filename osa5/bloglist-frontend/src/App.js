import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'

import AddBlog from './components/AddBlog'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import User from './components/User'

const App = () => {


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedBlogappUser')) || null)

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const [blogs, setBlogs] = useState([])

  const blogFormRef = React.createRef()

  // Set token on user change
  useEffect(() => {
    if(user){
      if(!blogService.token){
        blogService.setToken(user.token)
      }
    }
  }, [user])

  // Get blogs on user change
  useEffect(() => {
    const getBlogs = async () => {
      if(user){
        blogService
          .getAll()
          .then(blogs => {
            setBlogs(blogs)
          })
      }
    }
    getBlogs()
  },[user])

  // Render notification
  const handleNotification = (type, msg) => {

    setNotificationType(type)
    setNotificationMessage(msg)

    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
  }

  return(
    <div className='app'>
      <h1>Blogs</h1>

      <Notification type={notificationType} message={notificationMessage} />

      {user === null ?
        <Login setUser={setUser} handleNotification={handleNotification} /> :

        <User user={user} setUser={setUser} setBlogs={setBlogs} handleNotification={handleNotification} />
      }

      { user ?
        <Togglable buttonLabel='add blog' ref={blogFormRef}>
          <AddBlog blogs={blogs} setBlogs={setBlogs} handleNotification={handleNotification} blogFormRef={blogFormRef} />
        </Togglable> : null
      }

      {user ? <Blogs user={user} blogs={blogs} setBlogs={setBlogs} handleNotification={handleNotification}/> : null}

    </div>
  )
}

export default App
