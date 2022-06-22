import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCard } from '../../../features/boards/cards'

const CardHeader = ({ card, list }) => {
  const dispatch = useDispatch()

  const [ cardTitleInput, setCardTitleInput ] = useState(card.title)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.target.blur()
    }
  }

  const handleBlur = () => {
   handleUpdateCard()
  }

  const handleUpdateCard = () => {
    const updatedCard = {
      card: {
        title: cardTitleInput
      }
    }

    dispatch(updateCard({
      cardId: card._id,
      updatedCard 
    }))
  }

  return (
    <header>
      <i className="card-icon icon .close-modal"></i>
      <textarea 
        className="list-title" 
        style={{ height: "45px" }}
        value={cardTitleInput}
        onChange={(e) => setCardTitleInput(e.target.value)}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
      >
      </textarea>
      <p>
        in list <a className="link">{list.title}</a>
        <i className="sub-icon sm-icon"></i>
      </p>
    </header>
  )
}

export default CardHeader