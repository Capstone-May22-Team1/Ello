import React from 'react'
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { createList } from '../../features/boards/lists'

const AddList = () => {
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

export default AddList