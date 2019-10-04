import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

let blog = {}

beforeEach(() => {
  blog = {
    title: 'Blog name',
    author: 'Blog author',
    url: 'blogurl.com',
    likes: 1337
  }
})

test('renders blog, title and likes', () => {

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const renderedBlog = component.container.querySelector('.titleAndAuthor')
  expect(renderedBlog).toHaveTextContent(
    'Blog name Blog author'
  )

  const likes = component.container.querySelector('.likes')
  expect(likes).toHaveTextContent(
    'blog had 1337 likes'
  )
})

test('pressing like button', () => {
  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = component.container.querySelector('.like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})