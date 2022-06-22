import React from 'react'

const CardLabels = ({ card }) => {
  return (    
    <li className="labels-section">
      <h3>Labels</h3>
      {card.labels.map(label => (
        <div className="member-container" key={`container ${label}`}>
          <div key={label} className={`${label} label colorblindable`}></div>
        </div> 
      ))}
      <div className="member-container">
        <i className="plus-icon sm-icon"></i>
      </div>
    </li>
  )
}

export default CardLabels