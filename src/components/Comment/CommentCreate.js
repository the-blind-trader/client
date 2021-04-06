import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

const CommentCreate = props => {
  const [createdCommentId, setCreatedCommentId] = useState(null)
  const [comment, setComment] = useState({ title: '', text: '' })

  const handleChange = event => {
    event.persist()
    setComment(prevComment => {
      const updateFiled = { [event.target.name]: event.target.value }
      const editComment = Object.assign({}, prevComment, updateFiled)
      return editComment
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const { msgAlert } = props
    axios({
      url: `${apiUrl}/comments`,
      method: 'POST',
      data: { comment: comment },
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setCreatedCommentId(res.data.comment._id))
      .then(() => msgAlert({
        heading: 'Looking 100',
        message: messages.commentCreateSuccess,
        variant: 'Looking Good!'
      }))
      .catch(console.error)
      .catch(() => msgAlert({
        heading: 'Sorry 5000 Try Again',
        message: messages.commentCreateFailure,
        variant: ':\'('
      }))
  }
  if (createdCommentId) {
    return <Redirect to={`/comments/${createdCommentId}`} />
  }

  const { title, text } = comment

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3> Thoughts on the Market </h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                value={title}
                placeholder="title"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="text">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                required
                type="text"
                name="text"
                value={text}
                placeholder="comment"
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            > Submit
            </Button>
          </Form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CommentCreate
