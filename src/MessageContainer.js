import React from 'react';
import Message from './Message'
import {wrapEditButtons, wrapEditor, wrapViewer} from './messageWrappers'

export default function(props) {
  if(props.messages.length === 0){
    return props.children
  }
  const Template = props.Template;
  return (
    <div>{props.messages.map(message => {
      const MessageToggler = wrapEditButtons(wrapViewer(Template), wrapEditor(Template));
      return (
        <Message key={message.modified.toISOString()} message={message} user={props.user}
          onSubmit={props.onEdit} onRemove={props.onRemove}
          onInsertComment={props.onInsertComment} onRemoveComment={props.onRemoveComment}
          Template={MessageToggler}
        />
      );
    })}</div>
  )
}
