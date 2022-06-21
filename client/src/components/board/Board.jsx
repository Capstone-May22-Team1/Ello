import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // hook that gives us access to the URL Parameters
import { fetchBoard } from '../../features/boards/boards';
import { fetchCard } from '../../features/boards/cards';
import ExistingList from '../list/ExistingList';
import BoardHeader from './BoardHeader'

const Board = () => {
  const dispatch = useDispatch();

  const path = useParams()[0];
  let { id } = useParams()

  const cards = useSelector((state) => state.cards)
  const card = cards.find(c => c._id === id)

  if (card) {
    id = card.boardId
  }

  const boards = useSelector((state) => state.boards)
  const board = boards.find(b => b._id === id)  

  const generateBoardHeader = (board) 
    ? (<BoardHeader key={board._id} title={board.title} />)
    : ""

  useEffect(() => {
    if (path === 'boards') {
      dispatch(fetchBoard(id));
    } else if (path === 'cards') {
      dispatch(fetchCard({ id }));
    }
  }, [dispatch, id, path]);
   
  return (
    <>
      {generateBoardHeader}
      <ExistingList id={id}/>
    </>
  )  
}

export default Board;