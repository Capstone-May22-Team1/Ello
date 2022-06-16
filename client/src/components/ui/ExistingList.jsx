import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { createList } from "../../features/boards/lists"

const ExistingList = () => {
  const lists = useSelector((state => state.lists))

  return (
    <main>
      <div id="list-container" className="list-container">
        <div id="existing-lists" className="existing-lists">
          {lists.map(list => (
            <ListTile key={list._id} list={list} />
          ))}
        </div>
        <AddAList />
      </div>
    </main>
  )
}

const ListTile = ({ list }) => {
  const cards = useSelector((state => state.cards)).filter(card => card.listId === list._id)

  return (
    <div className="list-wrapper">
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            <p className="list-title">{list.title}</p>
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
                <CardContainer key={card._id} card={card}/>
              ))}
            </div>
          <AddCard />
        </div>
      </div>
    </div>
  )
}

const CardContainer = ({ card }) => {
  return (
    <>
      <div className="card-background">
        <div className="card ">
          <i className="edit-toggle edit-icon sm-icon"></i>
          <div className="card-info">
            {card.labels.map(label => (
              <div key={label} className={`card-label ${label} colorblindable`}></div>
            ))}
            <p>
              {card.title}
            </p>
          </div>
          <div className="card-icons">
            <i className="clock-icon sm-icon overdue-recent completed">
              {card.dueDate}
            </i>
            <i className="description-icon sm-icon"></i>
            <i className="comment-icon sm-icon"></i>
          </div>
        </div>
      </div>
    </>
  )
}


const AddCard = () => {
  return (
    <>
      <div className="add-dropdown add-bottom">
        <div className="card">
          <div className="card-info"></div>
            <textarea name="add-card"></textarea>
              <div className="members"></div>
        </div>
        <a className="button">Add</a>
        <i className="x-icon icon"></i>
        <div className="add-options">
          <span>...</span>
        </div>
      </div>
      <div className="add-card-toggle" data-position="bottom">
        Add a card...
      </div>
    </>
  )
}

const AddAList = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const [ listTitle, setListTitle ] = useState('')
  const [ displayListForm, setDisplayListForm ] = useState(false)
  
  const handleSubmitNewList = (e) => {
    e.preventDefault()
    const newList = {
      boardId: id,
      list: {
        title: listTitle
      }
    }

    dispatch(createList({ callback: resetForm, newList }))
  }

  const resetForm = () => {
    setListTitle('')
    setDisplayListForm(false)
  }

  return (
    <div id="new-list" className={`new-list ${displayListForm ? 'selected' : ''}`}>
      <span onClick={() => setDisplayListForm(true)}>Add a list...</span>
      <input 
        type="text" 
        placeholder="Add a list..." 
        value={listTitle}
        onChange={(e) => setListTitle(e.target.value)}
      />
      <div>
        <input type="submit" className="button" value="Save" onClick={handleSubmitNewList}/>
        <i onClick={() => setDisplayListForm(false)} className="x-icon icon"></i>
      </div>
    </div>
  )
}

export default ExistingList