import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

const CommentEdit = props => {
  const [comment, setComment] = useState({ title: '', text: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/comments/${props.match.params.id}`, {
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => {
        setComment(res.data.comment)
      })
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setComment(prevComment => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedComment = Object.assign({}, prevComment, updatedField)
      return editedComment
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    const { msgAlert } = props
    axios({
      url: `${apiUrl}/comments/${props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      method: 'PATCH',
      data: { comment: comment }
    })
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: 'Now Changed',
        message: messages.editSuccess,
        variant: 'Brand New'
      }))
      .catch(console.error)
      .catch(() => msgAlert({
        heading: 'Something is missing',
        message: messages.editFailure,
        variant: 'Try again'
      }))
  }
  if (updated) {
    return <Redirect to={`/comments/${props.match.params.id}`} />
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

export default CommentEdit
