import React from 'react';

export default function(props){
    const comment = props.message;
    // if(state.editing){
    //   content = (
    //     <div>
    //       <textarea className="w3-input" value={state.content}
    //           onChange={(ev)=>setState({content: ev.target.value})}
    //       />
    //       <button className="w3-btn-block w3-theme" onClick={onEdit}>Submit</button>
    //     </div>
    //   );
    // } else {
    // }
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
