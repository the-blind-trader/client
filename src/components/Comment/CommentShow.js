import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

const Comment = props => {
  const [comment, setComment] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    const { msgAlert } = props
    axios(`${apiUrl}/comments/${props.match.params.id}`, {
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setComment(res.data.comment))
      .then(() => msgAlert({
        heading: 'Gift List',
        message: messages.commentShowSuccess,
        variant: 'Looking Good!'
      }))
      .catch(console.error)
      .catch(() => msgAlert({
        heading: 'Gift List',
        message: messages.commentShowFailure,
        variant: 'Your list didn\'t load try again'
      }))
  }, [])
  const destroy = () => {
    const { msgAlert } = props
    axios({
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      url: `${apiUrl}/comments/${props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => setDeleted(true))
      .then(() => msgAlert({
        heading: 'Deleted',
        message: messages.commentDeletedSuccess,
        variant: 'It Is Gone Gone Gone'
      }))
      .catch(console.error)
      .catch(() => msgAlert({
        heading: 'Deleted',
        message: messages.commentDeletedFailure,
        variant: 'It Is Not Gone Gone Gone'
      }))
  }
  if (!comment) {
    return <p> Loading Comment </p>
  }
  if (deleted) {
    return <Redirect to={
      { pathname: '/coments', state: { msg: 'That\'s now gone' } }
    } />
  }
  return (
    <React.Fragment>
      <h4>{comment.title}</h4>
      <p>Comment: { comment.text }</p>
      <button onClick={destroy}>Remove Comment</button>
      <Link to={`/comments/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/comments">Back to Your Comments</Link>
    </React.Fragment>
  )
}

export default Comment
