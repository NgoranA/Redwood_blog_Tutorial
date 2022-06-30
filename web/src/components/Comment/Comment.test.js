import { render, screen, waitFor } from '@redwoodjs/testing/web'

import Comment from './Comment'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

const COMMENT = {
  name: 'Ngoran Aristide',
  body: 'This is my comment',
  createdAt: '2022-01-02T12:34:50Z',
}

describe('Comment', () => {
  it('Renders all the data', () => {
    // const comment = {
    //   name: 'Aristide',
    //   body: 'Software Engineer',
    //   createdAt: '2022-01-02T12:34:56Z',
    // }
    render(<Comment comment={COMMENT} />)

    expect(screen.getByText(COMMENT.name)).toBeInTheDocument()
    expect(screen.getByText(COMMENT.body)).toBeInTheDocument()
    const dateExpect = screen.getByText('2 Jan 2022')
    expect(dateExpect).toBeInTheDocument()
    expect(dateExpect.nodeName).toEqual('TIME')
    expect(dateExpect).toHaveAttribute('datetime', COMMENT.createdAt)
  })

  it('does not render a delete button if user is logged out', async () => {
    render(<Comment comment={COMMENT} />)

    await waitFor(() =>
      expect(screen.queryByText('Delete')).not.toBeInTheDocument()
    )
  })

  it('renders a delete button if the user is a moderator', async () => {
    mockCurrentUser({ roles: 'moderator' })
    render(<Comment comment={COMMENT} />)

    await waitFor(() => expect(screen.getByText('Delete')).toBeInTheDocument())
  })
})
