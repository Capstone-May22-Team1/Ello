import React, { useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoard } from '../../features/boards/boards';
import { useParams } from 'react-router-dom'; // hook that gives us access to the URL Parameter

const Board = () => {
  const { id } = useParams()
  const boards = useSelector((state) => state.boards) // returns an Array of Boards
  const dispatch = useDispatch();

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

// const List = () => {
//   return (
//     <div className="list-wrapper">
//     <div className="list-background">
//       <div className="list">
//         <a className="more-icon sm-icon" href=""></a>
//         <div>
//           <input
//             type="text"
//             className="list-title"
//             value="List title during editing"
//             autoFocus="true"
//           />
//         </div>
//         <div className="add-dropdown add-top">
//           <div className="card"></div>
//           <a className="button">Add</a>
//           <i className="x-icon icon"></i>
//           <div className="add-options">
//             <span>...</span>
//           </div>
//         </div>
//         <Card />
//         <div className="add-dropdown add-bottom">
//           <div className="card">
//             <div className="card-info"></div>
//             <textarea name="add-card"></textarea>
//             <div className="members"></div>
//           </div>
//           <a className="button">Add</a>
//           <i className="x-icon icon"></i>
//           <div className="add-options">
//             <span>...</span>
//           </div>
//         </div>
//         <div className="add-card-toggle" data-position="bottom">
//           Add a card...
//         </div>
//       </div>
//     </div>
//   </div>
//   )
// }

// const Card = () => {
//   return (
//     <div id="cards-container" data-id="list-2-cards">
//     <div className="card-background">
//       <div className="card ">
//         <i className="edit-toggle edit-icon sm-icon"></i>
//         <div className="cover-image"></div>
//         <div className="card-info">
//           <p>
//             Add members to a board (via the sidebar to
//             collaborate, share and discuss.
//           </p>
//         </div>
//         <div className="card-icons">
//           <i className="clock-icon sm-icon due-soon ">Sep 5</i>
//         </div>
//       </div>
//     </div>
//     <div className="card-background">
//       <div className="card ">
//         <i className="edit-toggle edit-icon sm-icon"></i>
//         <div className="cover-image"></div>
//         <div className="card-info">
//           <p>You can also change the background and more.</p>
//         </div>
//         <div className="card-icons"></div>
//       </div>
//     </div>
//   </div>
//   )
// }

export default Board;