import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // hook that gives us access to the URL Parameters
import { fetchBoard } from '../../features/boards/boards';
import ExistingList from './ExistingList';

const Board = () => {
  const dispatch = useDispatch();
  const { id } = useParams()
  const boards = useSelector((state) => state.boards) // returns an Array of Boards
  const board = boards.find(b => b._id === id)        

  console.log(boards)

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

const BoardHeader = ({ title }) => {
  return (
    <>
      <header>
      <ul>
        <li id="title">{title}</li>
        <li className="star-icon icon"></li>
        <li className="private private-icon icon">Private</li>
      </ul>
      <div className="menu">
        <i className="more-icon sm-icon"></i>Show Menu
      </div>
      <div className="subscribed">
        <i className="sub-icon sm-icon"></i>Subscribed
      </div>
    </header>
    </>
  )
}

export default Board;