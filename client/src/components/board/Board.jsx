import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // hook that gives us access to the URL Parameters
import { fetchBoard } from '../../features/boards/boards';
import ExistingList from '../list/ExistingList';
import BoardHeader from './BoardHeader'

const Board = () => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.cards)[0]
  const path = useParams()[0]; //returns path: boards | cards

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

  let { id } = useParams()
  if (path === 'cards' && card) {
    console.log('within the card path in Board')

    id = card.boardId
  }
  const boards = useSelector((state) => state.boards) // returns an Array of Boards
  const board = boards.find(b => b._id === id)        

  const generateBoardHeader = (board) 
    ? (<BoardHeader key={board._id} title={board.title} />)
    : ""

  useEffect(() => {
    dispatch(fetchBoard(id));
  }, [dispatch, id]);
   
  return (
    <>
      {generateBoardHeader}
      <ExistingList />
    </>
  )  
}

export default Board;