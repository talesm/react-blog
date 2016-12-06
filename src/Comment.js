import React from 'react';

export default function(props){
  const comment = props.message;
  return (
    <div className="App-comment w3-card-2 w3-section">
      {props.buttons}
      <div className="w3-container w3-theme-l3">
        On {comment.modified.toLocaleString()}, {comment.user || "Unknown"} said:
      </div>
      <div className="w3-container w3-theme-light">{comment.content}</div>
      {props.children}
    </div>
  )
}
