import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCard } from '../../features/boards/cards'

const AddCard = ({ listId, boardId, activeList, setActiveList }) => {
  const dispatch = useDispatch()
  const [ cardText, setCardText ] = useState('')

  const handleCreateCard = () => {
    const newCard = {
      boardId,
      listId,
      card: {
        title: cardText,
      }
    }
    dispatch(createCard({ callback: resetCard, newCard }))
  }

  const resetCard = () => {
    setCardText('')
    setActiveList('')
  }

  return (
    <>
      <div className={`add-dropdown add-bottom ${activeList === listId ? 'active-card' : ''}`}>
        <div className="card">
          <div className="card-info"></div>
            <textarea name="add-card" value={cardText} onChange={(e) => setCardText(e.target.value)}></textarea>
              <div className="members"></div>
        </div>
        <a className="button" onClick={handleCreateCard}>Add</a>
        <i className="x-icon icon" onClick={() => setActiveList('')}></i>
        <div className="add-options">
          <span>...</span>
        </div>
      </div>
      <div className="add-card-toggle" data-position="bottom" onClick={() => setActiveList(listId)}>
        Add a card...
      </div>
    </>
  )
}

export default AddCard