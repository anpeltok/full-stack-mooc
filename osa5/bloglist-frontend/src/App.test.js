import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from './App'

beforeEach(() => {
  localStorage.clear()
})

describe('<App />', () => {

  test('if no logged user, does not render blogs', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.container.querySelector('.loginForm'))

    const app = component.container.querySelector('.app')

    expect(app).toContainElement(component.container.querySelector('.loginForm'))
    expect(app).toContainElement(component.container.querySelector('.username'))
    expect(app).toContainElement(component.container.querySelector('.password'))
    expect(app).toContainElement(component.container.querySelector('.loginSubmit'))
    expect(app).not.toContainElement(component.container.querySelector('.blogs'))

  })

  test('when logged in, login is not rendered', async () => {

    const user = {
      username: 'username',
      token: 1337,
      name: 'User Name'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.container.querySelector('.blogs'))

    const app = component.container.querySelector('.app')

    expect(app).not.toContainElement(component.container.querySelector('.loginForm'))

  })

  test('when logged in, blogs are rendered properly', async () => {

    const user = {
      username: 'username',
      token: 1337,
      name: 'User Name'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.container.querySelector('.blogs'))

    const blogs = component.container.querySelectorAll('.blog')

    expect(blogs.length).toBe(3)

    expect(component.container).toHaveTextContent('Blog one')
    expect(component.container).toHaveTextContent('Blog two')
    expect(component.container).toHaveTextContent('Blog three')
  })

})