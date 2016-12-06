import React from 'react';
import PostContent from './PostContent'

export default function(props){
  const message = props.message;
  const title = (
    <input placeholder="Title" className="w3-input"
      onChange={props.onEditTitle} value={message.title}/>
  );
  const content = (
    <textarea placeholder="Content Here." className="w3-input"
      onChange={props.onEditContent} value={message.content} />
  );
  return (
    <form className="App-insert App-post">
      <PostContent
        {...props.message}
        title={title}
        content={content}
      >
        <button className="w3-btn-block w3-theme" onClick={props.onSubmit}>Submit</button>
      </PostContent>
    </form>
  );
}
