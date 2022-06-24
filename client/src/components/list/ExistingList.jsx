import React, { useState } from "react"
import Dragula from 'react-dragula';
import { useSelector, useDispatch } from "react-redux"
import ListTile from "./ListTile"
import AddList from "./AddList"
import { updateBoard } from "../../features/boards/boards"

const ExistingList = ({ id }) => {
  const lists = useSelector((state => state.lists)).filter(list => list.boardId === id)
  const [ activeList, setActiveList ] = useState('')
  const dispatch = useDispatch()

  let containers = []

  let drake = Dragula(containers, { direction: 'horizontal'})

  const dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      containers.push(componentBackingInstance)
    }
  };

  drake.on('drop', () => {
    let allLists = [...document.querySelectorAll('#cards-container')]

    let correctListIds = allLists.slice(0, -1).map(list => {
      let dataId = list.getAttribute('data-id')
      let listId = dataId.split('-')[1]
      
      return listId
    })

    const updatedBoard = {
      board: {
        lists: correctListIds
      }
    }

    dispatch(updateBoard({ boardId: id, updatedBoard}))
  })

  return (
    <main>
      <div id="list-container" className="list-container">
        <div id="existing-lists" className="existing-lists" >
          <div className="container">
            {lists.map(list => (
              <div 
                key={`div${list._id}`} 
                className='list-wrapper' 
                ref={dragulaDecorator}
              >
                <ListTile 
                  key={list._id} 
                  list={list} 
                  listId={list._id} 
                  boardId={id} 
                  activeList={activeList}
                  setActiveList={setActiveList}
                />
              </div>
            ))}
          </div>
        </div>
        <AddList />
      </div>
    </main>
  )
}

export default ExistingList


/*
import * as React from "react";
import Dragula from 'react-dragula';

export class App extends React.Component {
  constructor (props) {
    this.containers = []
  }

  componentDidMount () {
    const drake = Dragula(this.containers, {revertOnSpill: true})
  }

  render () {
    const dragulaDecorator = (componentBackingInstance) => {
      if (componentBackingInstance) {
        this.containers.push(componentBackingInstance)
      }
    }
    
    return <div>
      <div className='container' ref={dragulaDecorator}>
        <div>Swap me around</div>
        <div>Swap her around</div>
        <div>Swap him around</div>
        <div>Swap them around</div>
        <div>Swap us around</div>
        <div>Swap things around</div>
        <div>Swap everything around</div>
      </div>
      <div className='container' ref={dragulaDecorator} />
  </div>;
  }
};

ReactDOM.render(<App />, document.getElementById('examples'));
*/


/*
dragula([list1, list2, list3])
  .on('drop', (el, target) => {
    console.log(el.className)
    console.log(el.target)
  })


dragula([document.getElementById(left), document.getElementById(right)])
  .on('drag', function (el) {
    el.className = el.className.replace('ex-moved', '');
  }).on('drop', function (el) {
    el.className += ' ex-moved';
  }).on('over', function (el, container) {
    container.className += ' ex-over';
  }).on('out', function (el, container) {
    container.className = container.className.replace('ex-over', '');
  });

var drake = dragula(Array.from(document.getElementsByClassName('phase')));
  drake.on('drop', (el, target) => {
    this.props.moveCard(el.id, target.id);
  });

  
Calculation of item positions
If the item is the first to be created in the group, it gets a position of 65535.

If the item is inserted at the beginning of the group, the position becomes 
half of the previously-first item’s position.

If the item is inserted at the end of the list, the position becomes the 
previously-last item’s position plus 65536

If the item is inserted between two other items, the position becomes 
(itemBefore.position + itemAfter.position) / 2.

Positions are floats with a high precision (10 digits or so)

import * as React from "react";
import * as ReactDOM from 'react-dom';
import Dragula from 'react-dragula';
export class App extends React.Component {
  render () {
    return <div className='container' ref={this.dragulaDecorator}>
      <div>Swap me around</div>
      <div>Swap her around</div>
      <div>Swap him around</div>
      <div>Swap them around</div>
      <div>Swap us around</div>
      <div>Swap things around</div>
      <div>Swap everything around</div>
    </div>;
  },
  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = { };
      Dragula([componentBackingInstance], options);
    }
  };
});
ReactDOM.render(<App />, document.getElementById('examples'));
*/

// not consistent, these are lists only from the board
  // State of Active Lists -> an Id -> only one list can display 'add a card'
  // Modify the state of Active List
  // Only Show the Form if the List is Active
  // Reset the List Form, or Keep the User Input
  // onMouseDown -> onBlur -> precedence over onClick?