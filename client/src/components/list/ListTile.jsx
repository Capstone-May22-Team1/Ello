import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateList } from "../../features/boards/lists"
import CardContainer from "../card/CardContainer"
import AddCard from "../card/AddCard"

const ListTile = ({ list, listId }) => {
  const dispatch = useDispatch()
  const cards = useSelector((state => state.cards)).filter(card => card.listId === list._id)
  const [ displayAddCardForm, setDisplayAddCardForm ] = useState(false)

  const [ displayEditListInput, setDisplayEditListInput ] = useState(false)
  const [ editListInput, setEditListInput ] = useState(list.title)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUpdateList()
    }
  }

  const handleBlur = () => {
   handleUpdateList()
  }

  const handleUpdateList = () => {
    dispatch(updateList({
      updatedList: {title: editListInput}, 
      listId, 
      callback: resetForm
    }))
  }

  const resetForm = () => {
    setDisplayEditListInput(false)
  }

  return (
    <div className={`list-wrapper ${displayAddCardForm ? 'add-dropdown-active' : ''}`}>
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {(displayEditListInput
              ? <input
                  type="text" 
                  className="list-title"
                  value={editListInput}
                  onChange={(e) => setEditListInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  autoFocus
                  onBlur={handleBlur}
                />
              : <p className="list-title" onClick={() => setDisplayEditListInput(true)}>{list.title}</p>)}
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
            <div id="cards-container" data-id={`list-${list._id}-cards`}>
              {cards.map(card => (
                <CardContainer 
                  key={card._id} 
                  card={card}
                />
              ))}
            </div>
          <AddCard 
            listId={listId}
            displayAddCardForm={displayAddCardForm}
            setDisplayAddCardForm={setDisplayAddCardForm}
          />
        </div>
      </div>
    </div>
  )
}

export default ListTile