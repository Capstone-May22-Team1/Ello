import React from "react"
import { useSelector } from "react-redux"
import ListTile from "./ListTile"
import AddList from "./AddList"

const ExistingList = ({ id }) => {
  const lists = useSelector((state => state.lists)).filter(list => list.boardId === id)

  return (
    <main>
      <div id="list-container" className="list-container">
        <div id="existing-lists" className="existing-lists">
          {lists.map(list => (
            <ListTile key={list._id} list={list} listId={list._id} boardId={id}/>
          ))}
        </div>
        <AddList />
      </div>
    </main>
  )
}

export default ExistingList

// not consistent, these are lists only from the board
  // State of Active Lists -> an Id -> only one list can display 'add a card'
  // Modify the state of Active List
  // Only Show the Form if the List is Active
  // Reset the List Form, or Keep the User Input
  // onMouseDown -> onBlur -> precedence over onClick?