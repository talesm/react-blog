import React from 'react';
import CommentSection from './CommentSection';

export default function(props) {
  const message = props.message;
  return (
    <div>
      <div className="w3-container w3-theme">
        <h3>{message.title}</h3>
      </div>
      <div className="w3-container w3-theme-light">{message.content}</div>
      {props.children}
      <div className="w3-container w3-theme-l4">
        <div>Created By {message.user} on {message.created.toLocaleString()}</div>
        {message.modified && message.modified !== message.created && (
          <div>Modified on {message.modified.toLocaleString()}</div>
        )}
      </div>
      <CommentSection onInsert={props.onInsertComment} onRemove={props.onRemoveComment}
        onEdit={props.onEditComment} comments={message.comments}
      />
    </div>
  )
}
