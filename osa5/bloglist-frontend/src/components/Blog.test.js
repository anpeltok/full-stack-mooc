import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let mockBlog
let mockUser
let component

beforeEach(() => {

  mockUser = {
    username: 'username',
    name: 'User'
  }

  mockBlog = {
    title: 'Blog name',
    author: 'Blog author',
    url: 'blogurl.com',
    likes: 1337,
    user: mockUser
  }

  const mockHandler = jest.fn()

  component = render(
    <Blog blog={mockBlog} blogs={[]} setBlogs={mockHandler} handleNotification={mockHandler} user={mockUser} />
  )
})

test('blog shows more info on click', () => {

  let blog = component.container.querySelector('.blog')

  expect(blog).toHaveTextContent(
    'Blog name by Blog author'
  )

  let optionalInfo = component.container.querySelector('.optionalInfo')
  expect(optionalInfo).toEqual(null)

  const clickableBlog = component.container.querySelector('.blog')
  fireEvent.click(clickableBlog)

  optionalInfo = component.container.querySelector('.optionalInfo')

  expect(blog).toContainElement(optionalInfo)

  expect(blog).toHaveTextContent(
    'blogurl.com'
  )
  expect(blog).toHaveTextContent(
    '1337 likes'
  )
  expect(blog).toHaveTextContent(
    'Added by User'
  )

})