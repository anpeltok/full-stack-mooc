import React from 'react'
import PropTypes from 'prop-types'

const User = ({ user, setUser, setBlogs, handleNotification }) => {

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setBlogs([])

    handleNotification('success', 'Logout successful')
  }

  return (
    <div>
      <p>
        Logged in as {user.name}
        <button onClick={handleLogout}>Logout</button>
      </p>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  handleNotification: PropTypes.func.isRequired
}

export default User