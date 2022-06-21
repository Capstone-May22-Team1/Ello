import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // hook that gives us access to the URL Parameters
import { fetchBoard } from '../../features/boards/boards';
import { fetchCard } from '../../features/boards/cards';
import ExistingList from '../list/ExistingList';
import BoardHeader from './BoardHeader'

const Board = () => {
  const dispatch = useDispatch();

  const path = useParams()[0]; //returns path: boards | cards
  let { id } = useParams()

  const [boardId, setBoardId] = useState(id)

  const boards = useSelector((state) => state.boards)
  const board = boards.find(b => b._id === id)  
  
  const cards = useSelector((state) => state.cards)
  const card = cards.find(c => c._id === id)

  const generateBoardHeader = (board) 
    ? (<BoardHeader key={board._id} title={board.title} />)
    : ""

  useEffect(() => {
    if (path === 'boards') {
      dispatch(fetchBoard(id));
    } else if (path === 'cards') {
      dispatch(fetchCard({ id }));
      setBoardId(card.boardId)
      // set id to card.boardId
    }
  }, [dispatch, id, path]);
   
  return (
    <>
      {generateBoardHeader}
      <ExistingList id={boardId}/>
    </>
  )  
}

export default Board;

  // const card = useSelector((state) => state.cards)[0]
  // console.log(card)
 
  // if (path === 'cards' && card !== undefined) {
  //   id = card.boardId
  // }

  /*
   Path => cards
    even within Board the URL is for the CardId
    we need to get the BoardId

    Redux Store (on refresh) is empty

    If we render the Card Component First => Redux.card (MIGHT) have the single card

    if it doesn't, since we have the url

    from within Board => make a fetchCard request (from within Board)
    and from that, you can update the Store => card.state

    from the card.state, you can get the BoardId

    and then you use fetchBoard => and useEffect ot update the Board State

    and then render the Board Component
  */