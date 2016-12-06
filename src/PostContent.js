import React from 'react';
import CommentSection from './CommentSection';

export default function(props) {
  return (
    <div>
      <div className="w3-container w3-theme">
        <h3>{props.title}</h3>
      </div>
      <div className="w3-container w3-theme-light">{props.content}</div>
      {props.children}
      <div className="w3-container w3-theme-l4">
        <div>Created By {props.user} on {props.created.toLocaleString()}</div>
        {props.modified && props.modified !== props.created && (
          <div>Modified on {props.modified.toLocaleString()}</div>
        )}
      </div>
      <CommentSection onInsert={props.onInsertComment} onRemove={props.onRemoveComment}
        onEdit={props.onEditComment} comments={props.comments}
      />
    </div>
  )
}
