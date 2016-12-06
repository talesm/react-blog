import React from 'react';
import Comment from './Comment';
import CommentInserter from './CommentInserter'
import Message from './Message'
import MessageContainer from './MessageContainer'

export default function(props) {
  const message = props.message;
  return (
    <div className="App-post w3-card-4 w3-margin">
      {props.buttons}
      <div className="w3-container w3-theme">
        <h3>{message.title}</h3>
      </div>
      <div className="w3-container w3-theme-light">{message.content}</div>
      {props.children}
      <div className="w3-container w3-theme-l4">
        <div>Created By {message.user} on {message.created.toLocaleString()}</div>
        {message.lastEdited && (
          <div>Modified on {message.lastEdited.toLocaleString()}</div>
        )}
      </div>
      <div className="App-comment-box w3-theme-l4 w3-container">
        <div>
          <h4>{message.comments.length > 0? "Comments:": "No Comments Yet."}</h4>
        </div>
        <MessageContainer Template={Comment} messages={message.comments}
          onEdit={props.onEditComment}
          onRemove={props.onRemoveComment}
          user={props.user}
        >Nothing</MessageContainer>
      </div>
      <Message Template={CommentInserter} user={props.user} onSubmit={props.onInsertComment}/>
    </div>
  )
}
