import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../../features/boards/comments'

const CommentSection = ({ card }) => {
  const dispatch = useDispatch()
  const [ newCommentText, setNewCommentText ] = useState('')

  const handleNewCommentSubmitted = (event) => {
    event.preventDefault()
    const newComment = {
      cardId: card._id,
      comment: {
        text: newCommentText
      }
    }

    dispatch(createComment({ newComment, callback: clearCommentForm }))
  }

  const clearCommentForm = () => {
    setNewCommentText('')
  }

  return (
    <li className="comment-section">
      <h2 className="comment-icon icon">Add Comment</h2>
      <div>
        <div className="member-container">
          <div className="card-member">TP</div>
        </div>
        <div className="comment">
          <label>
            <textarea
              required=""
              rows="1"
              placeholder="Write a comment..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
            ></textarea>
            <div>
              <a className="light-button card-icon sm-icon"></a>
              <a className="light-button smiley-icon sm-icon"></a>
              <a className="light-button email-icon sm-icon"></a>
              <a className="light-button attachment-icon sm-icon"></a>
            </div>
            <div>
              <input
                type="submit"
                className="button"
                value="Save"
                onClick={handleNewCommentSubmitted}
              />
            </div>
          </label>
        </div>
      </div>
    </li>
  )
}

export default CommentSection