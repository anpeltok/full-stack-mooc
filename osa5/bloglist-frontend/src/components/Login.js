import React from 'react'
import PropTypes from 'prop-types'

import loginService from '../services/login'

import { useField } from '../hooks'

const Login = ({ setUser, handleNotification }) => {

  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const resetFields = () => {
    resetUsername()
    resetPassword()
  }

  const handleLogin = async event => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      resetFields()

      handleNotification('success', 'Login successful')

      setUser(user)

    } catch(exception){

      resetFields()

      handleNotification('error', 'Login info incorrect')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form className='loginForm' onSubmit={handleLogin}>
        <div>
          username
          <input
            className='username'
            name='Username'
            {...username}
          />
        </div>
        <div>
          password
          <input
            className='password'
            name='Password'
            {...password}
          />
        </div>
        <button className='loginSubmit' type='submit'>login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  handleNotification: PropTypes.func.isRequired
}

export default Login