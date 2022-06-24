import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // hook that gives us access to the URL Parameters
import { fetchBoard } from '../../features/boards/boards';
import ExistingList from '../list/ExistingList';
import BoardHeader from './BoardHeader'

const Board = () => {
  const dispatch = useDispatch();
  const path = useParams()[0];
  let { id } = useParams()
  let boardId

  const cards = useSelector((state) => state.cards)

  if (path === 'boards') {
    boardId = id
  } else if (path === 'cards') {
    const card = cards.find(c => c._id === id)

    if (card) {
      boardId = card.boardId
    }
  }

  const boards = useSelector((state) => state.boards)
  const board = boards.find(b => b._id === boardId)  

  const generateBoardHeader = (board) 
    ? (<BoardHeader key={board._id} title={board.title} />)
    : ""

  useEffect(() => {
    if (boardId) {
      dispatch(fetchBoard(boardId))
    }
  }, [dispatch, boardId]);
   
  return (
    <div>
      {generateBoardHeader}
      <ExistingList id={boardId}/>
    </div>
  )  
}

export default Board;