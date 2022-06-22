import React from "react";
import CardHeader from "./CardHeader";
import CardLabels from "./CardLabels";
import CardDueDate from "./CardDueDate";
import CardDescriptionForm from "./CardDescriptionForm"
import CommentSection from "./CommentSection";
import ActivitySection from './ActivitySection'
import SidebarButtons from './SideBarButtons'

const Card = ({ card, list }) => {
  return (
    <>
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        {/* Add functionalty for closing card on x-icon */}
        <i className="x-icon icon close-modal"></i>
        <CardHeader card={card} list={list}/>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                <CardLabels card={card} list={list}/>
                <CardDueDate />
              </ul>
              <CardDescriptionForm />
            </li>
            <CommentSection card={card}/>
            <ActivitySection />
          </ul>
        </section>
        <SidebarButtons />
      </div>
    </div>
  </>
  )
}

export default Card