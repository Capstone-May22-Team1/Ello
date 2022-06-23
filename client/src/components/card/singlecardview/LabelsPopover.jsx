import React from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { updateCard } from "../../../features/boards/cards";
import { ColourContext } from "../../../lib/ColourContext";


const LabelsPopover = ({ onCloseClick, card }) => {
  const dispatch = useDispatch()

  let labels = [...card.labels] 

  const idToColor = {
    1: 'green',
    2: 'yellow',
    3: 'orange',
    4: 'red',
    5: 'purple', 
    6: 'blue',
  }

  const displayColourCheck = (dataId) => {

    const colour = idToColor[dataId]

    if (labels.includes(colour)) {
      return (<i className="check-icon sm-icon"></i>)
    } else {
      return (<i className="uncheck-icon sm-icon"></i>)
    }
  }

  const { colourBlind, setColourBlind } = useContext(ColourContext)

  const handleColourClick = (e) => {
    const colourId = e.target.getAttribute("data-id")
    const colour = idToColor[colourId]

    if (colour && !labels.includes(colour)) {
      labels.push(colour)
    } else {
      labels = labels.filter(labelColour => labelColour !== colour)
    }

    const updatedCard = { 
      "card": {
        labels
      }
    }

    dispatch(updateCard({ cardId: card._id, updatedCard }))
  }

  return (
      <div id="add-options-labels-dropdown">
        <header>
          <span>Labels</span>
          <a href="#" className="icon-sm icon-close" onClick={onCloseClick}></a>
        </header>
        <div className="content">
          <input
            className="dropdown-input"
            placeholder="Search labels..."
            type="text"
          />
          <div className="labels-search-results">
            <ul className="label-list">
              <li onClick={handleColourClick}>
                <div className="green colorblindable" data-id="1">
                  {displayColourCheck(1)}
                </div>
                <div className="label-background green"></div>
                <div className="label-background-overlay"></div>
                <i className="edit-icon icon not-implemented"></i>
              </li>
              <li onClick={handleColourClick}>
                <div className="yellow colorblindable" data-id="2">
                  {displayColourCheck(2)}
                </div>
                <div className="label-background yellow"></div>
                <div className="label-background-overlay"></div>
                <i className="edit-icon icon not-implemented"></i>
              </li>
              <li onClick={handleColourClick}>
                <div className="orange colorblindable" data-id="3">
                  {displayColourCheck(3)}
                </div>
                <div className="label-background orange"></div>
                <div className="label-background-overlay"></div>
                <i className="edit-icon icon not-implemented"></i>
              </li>
              <li onClick={handleColourClick}>
                <div className="red colorblindable" data-id="4">
                  {displayColourCheck(4)}
                </div>
                <div className="label-background red"></div>
                <div className="label-background-overlay"></div>
                <i className="edit-icon icon not-implemented"></i>
              </li>
              <li onClick={handleColourClick}>
                <div className="purple colorblindable" data-id="5">
                  {displayColourCheck(5)}
                </div>
                <div className="label-background purple"></div>
                <div className="label-background-overlay"></div>
                <i className="edit-icon icon not-implemented"></i>
              </li>
              <li onClick={handleColourClick}>
                <div className="blue colorblindable" data-id="6">
                  {displayColourCheck(6)}
                </div>
                <div className="label-background blue"></div>
                <div className="label-background-overlay"></div>
                <i className="edit-icon icon not-implemented"></i>
              </li>
            </ul>
            <ul className="light-list">
              <li className="not-implemented">Create a new label</li>
              <hr />
              <li className="toggleColorblind" onClick={() => setColourBlind(!colourBlind)}>
                Enable color blind friendly mode.
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default LabelsPopover;
