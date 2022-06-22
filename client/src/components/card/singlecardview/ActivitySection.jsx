import React from 'react'
import Comment from './Comment'

import { useSelector } from 'react-redux'

const ActivitySection = () => {
  const comments = useSelector(state => state.comments)

  return (
    <li className="activity-section">
      <h2 className="activity-icon icon">Activity</h2>
      <ul className="horiz-list">
        <li className="not-implemented">Show Details</li>
      </ul>
      <ul className="modal-activity-list">
        {comments.map(comment => (
          <Comment key={comment._id} comment={comment}/>
        ))}
      </ul>
    </li>
  )
}

export default ActivitySection