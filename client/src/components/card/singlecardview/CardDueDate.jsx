import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCard } from '../../../features/boards/cards'

const CardDueDate = ({ card, onLabelClick, dateDiv }) => {
  const dispatch = useDispatch()
  const [ completed, setCompleted ] = useState(!!card.completed)

  const handleCheckboxClicked = (e) => {
    e.stopPropagation()
    const updatedCard = {
      card: {
        completed: !completed,
      }
    }

    dispatch(updateCard({ cardId: card._id, updatedCard }))
  }

  const dateToString = (inputdate) => {
    let date = new Date(inputdate)
    let month = date.toLocaleString('en-us', { month: 'short' });
    let day = date.getDate()
    return `${month} ${day}`
  }

  const timeToString = (inputdate) => {
    let time = new Date(inputdate)
    time = time.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: true});
    return time
  }

  const checkValidDate = (inputDate) => {
    if (inputDate) {
      return (
        <div id="dueDateDisplay" className="overdue completed" onClick={onLabelClick}>
          <input
            id="dueDateCheckbox"
            type="checkbox"
            className="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
            onClick={handleCheckboxClicked}
          />
          {`${dateToString(card.dueDate)} at ${timeToString(card.dueDate)}`} <span >(past due)</span> 
        </div>
      )
    } else {
      return (<i className="plus-icon sm-icon" onClick={onLabelClick}></i>)
    }
  }

  return (
    <li className="due-date-section">
      <h3>Due Date</h3>
        <div ref={dateDiv}></div>
        {checkValidDate(card.dueDate)}
    </li>
  )
}

export default CardDueDate