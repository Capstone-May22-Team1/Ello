import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCard } from '../../features/boards/cards';
import Card from "./Card"


const CardView = () => {
  const dispatch = useDispatch()
  const { cardId } = useParams()
  const card = useSelector((state) => state.cards).find(card => card._id === cardId) 
  const list = useSelector((state) => state.lists).find(list => card.listId === list._id)
  
  useEffect(() => {
    dispatch(fetchCard({id: cardId}))
  }, [dispatch, cardId])
  

  const generateCardView = ( card && list )
    ? (<Card card={card} list={list} />)
    : ""

  return (
    <>
      {generateCardView}
    </>
  )
}

export default CardView