import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCard } from '../../../features/boards/cards'

const CardDescriptionForm = ({ card, setDisplayForm }) => {
  const dispatch = useDispatch()
  
  const [ descriptionFormValue, setDescriptionFormValue ] = useState(card.description)

  const handleSubmit = () => {
    const updatedCard = {
      card: {
        description: descriptionFormValue
      }
    }

    dispatch(updateCard({
      cardId: card._id,
      updatedCard,
      callback: resetForm
    }))
  }

  const resetForm = () => {
    setDisplayForm(false)
  }

  return (
    <form className="description">
      <p>Description</p>
      <textarea 
        className="textarea-toggle" 
        rows="1" 
        autoFocus
        value={descriptionFormValue}
        onChange={(e) => setDescriptionFormValue(e.target.value)}
      >
      </textarea>
      <div>
        <div className="button" value="Save" onClick={handleSubmit}>
          Save
        </div>
        <i className="x-icon icon" onClick={() => setDisplayForm(false)}></i>
      </div>
    </form>
  )

}

export default CardDescriptionForm