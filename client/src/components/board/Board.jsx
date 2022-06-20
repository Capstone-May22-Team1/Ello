import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // hook that gives us access to the URL Parameters
import { fetchBoard } from '../../features/boards/boards';
import ExistingList from '../list/ExistingList';
import BoardHeader from './BoardHeader'

const Board = () => {
  const dispatch = useDispatch();
  const { id } = useParams()
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