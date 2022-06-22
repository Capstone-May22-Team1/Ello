import React from 'react'

const CardDescriptionForm = () => {
  return (
    <form className="description">
      <p>Description</p>
      <span id="description-edit" className="link">
        Edit
      </span>
      <p className="textarea-overlay" >
        Cards have a symbol to indicate if they contain a description.
      </p>
      <p id="description-edit-options" className="hidden">
        You have unsaved edits on this field.{" "}
        <span className="link">View edits</span> -{" "}
        <span className="link">Discard</span>
      </p>
    </form>
  )
}

export default CardDescriptionForm