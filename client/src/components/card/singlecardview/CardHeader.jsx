import React from 'react'

const CardHeader = ({ card, list }) => {
  return (
    <header>
      <i className="card-icon icon .close-modal"></i>
      <textarea className="list-title" style={{ height: "45px" }}>
        {card.title}
      </textarea>
      <p>
        in list <a className="link">{list.title}</a>
        <i className="sub-icon sm-icon"></i>
      </p>
    </header>
  )
}

export default CardHeader