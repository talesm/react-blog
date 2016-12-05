import React from 'react';
import Post from './Post';

export default function Message(props) {
  const message = props.message;
  return <Post post={message} user={props.user} onEdit={props.onEdit}
    onRemove={props.onRemove} onInsertComment={props.onInsertComment}
    onEditComment={props.onEditComment} onRemoveComment={props.onRemoveComment}/>
}
