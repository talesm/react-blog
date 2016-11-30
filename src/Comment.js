import React from 'react';

export default function Comment(props) {
  const comment = props.comment;
  return (
    <div className="App-comment w3-card-2 w3-section">
      <div className="w3-container w3-theme-l3">
        On {comment.modified.toLocaleString()}, {comment.author} said:
      </div>
      <div className="w3-container w3-theme-light">
        {comment.content}
      </div>
    </div>
  )
}
