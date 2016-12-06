import React from 'react';

export default function(props){
  if(!props.editable) {
    return null;
  }
  const message = props.message;
  return (
    <form className="App-insert App-post">
      <input placeholder="Title" className="w3-input"
        onChange={props.onEditTitle} value={message.title}
      />
      <textarea placeholder="Content Here." className="w3-input"
        onChange={props.onEditContent} value={message.content}
      />
      <button className="w3-btn-block w3-theme" onClick={props.onSubmit}>Insert Post</button>
    </form>
  );
}
