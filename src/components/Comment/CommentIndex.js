import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

const Comments = props => {
  const [comments, setComment] = useState([])

  useEffect(() => {
    const { msgAlert } = props
    axios(`${apiUrl}/comments/`, {
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setComment(res.data.comments))
      .then(() => msgAlert({
        heading: 'Thoughts On Market',
        message: messages.indexSuccess,
        variant: 'Market Thoughts Loaded'
      }))
      .catch(console.error)
      .catch(() => msgAlert({
        heading: 'Thoughts On Market',
        message: messages.indexFailure,
        variant: 'It didn\'t load try again'
      }))
  }, [])
  const comment = comments.map(comment => (
    <li key={comment._id}>
      <Link to={`/comments/${comment._id}`}>{comment.title}</Link>
    </li>
  ))
  return (
    <React.Fragment>
      <h4>Thoughts on the Market</h4>
      <ul>
        {comment}
      </ul>
    </React.Fragment>
  )
}

export default Comments
