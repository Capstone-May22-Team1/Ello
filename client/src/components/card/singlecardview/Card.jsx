import React, { useReducer, useRef } from "react";
import CardHeader from "./CardHeader";
import CardLabels from "./CardLabels";
import CardDueDate from "./CardDueDate";
import CardDescriptionForm from "./CardDescriptionForm"
import CardDescription from "./CardDescription";
import CommentSection from "./CommentSection";
import ActivitySection from './ActivitySection'
import SidebarButtons from './SideBarButtons'
import { Link } from "react-router-dom";
import { useState } from "react";

import Popover from "../../shared/Popover";
import LabelsPopover from "./LabelsPopover";
import DueDatePopover from "./DueDatePopover";


const Card = ({ card, list }) => {

  const [ displayDescriptionEditForm, setDisplayDescriptionEditForm ] = useState(false)
  const plusButton = useRef(null)
  const dateDiv = useRef(null)

  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty,
  });

  const initState = {
    popover: {
      visible: false,
      attachedTo: null,
      type: null,
    },
  };

  const [state, setState] = useReducer(reducer, initState);
  const [datePopoverState, setDatePopoverState] = useReducer(reducer, initState);

  const handleLabelFormClick = (e) => {
    setState({
      popover: {
        visible: true,
        attachedTo: plusButton.current,
        type: "labels",
      },
    });
  };

  const handleDueDateFormClick = (e) => {
    setDatePopoverState({
      popover: {
        visible: true,
        attachedTo: dateDiv.current,
        type: "due-date",
      },
    });
  };

  const handleClosePopoverClick = (e) => {
    e.preventDefault();
    setState(initState);
  };

  const handleCloseDatePopoverClick = (e) => {
    e.preventDefault();
    setDatePopoverState(initState);
  };

  const [ time, setTime ] = useState('12:00 PM')

  return (
    <>
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        <Link to={`/boards/${card.boardId}`}>
          <i className="x-icon icon close-modal"></i>
        </Link>
        <CardHeader card={card} list={list}/>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                <CardLabels 
                  card={card} 
                  list={list} 
                  onLabelClick={handleLabelFormClick} 
                  plusButton={plusButton}
                />
                <CardDueDate 
                  card={card} 
                  onLabelClick={handleDueDateFormClick} 
                  dateDiv={dateDiv}
                />
              </ul>
              { displayDescriptionEditForm 
                ? 
                <>
                  <CardDescriptionForm 
                    card={card}
                    displayForm={displayDescriptionEditForm}
                    setDisplayForm={setDisplayDescriptionEditForm}
                  />
                </> 
                :
                <>
                  <CardDescription 
                    card={card}
                    displayForm={displayDescriptionEditForm}
                    setDisplayForm={setDisplayDescriptionEditForm}
                  />
                </>}
            </li>
            <CommentSection card={card}/>
            <ActivitySection />
          </ul>
        </section>
        <SidebarButtons 
          onLabelClick={handleLabelFormClick}
          onDueDateLabelClick={handleDueDateFormClick} 
        />
      </div>
    </div>
    <Popover {...state.popover} coverTarget={true}>
      <LabelsPopover onCloseClick={handleClosePopoverClick} card={card}/>
    </Popover>
    <Popover {...datePopoverState.popover} coverTarget={true}>
      <DueDatePopover 
        onCloseClick={handleCloseDatePopoverClick} 
        card={card}
        time={time}
        setTime={setTime}
      />
    </Popover>
  </>
  )
}

export default Card