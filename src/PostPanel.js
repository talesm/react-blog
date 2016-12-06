import React from 'react';
import Message from './Message'
import {wrapEditButtons, wrapEditor, wrapViewer} from './messageWrappers'
import PostContent from './PostContent'

export default function PostPanel(props) {
  if(props.posts.length === 0){
    return (<div className="w3-card-4 w3-center w3-theme-light"><h2>No post yet</h2></div>)
  }
  return (
    <div>{props.posts.map(message => {
      const MessageToggler = wrapEditButtons(wrapViewer(PostContent), wrapEditor(PostContent));
      return (
        <Message key={message.id} message={message} user={props.user}
          onSubmit={props.onEdit} onRemove={props.onRemove}
          onInsertComment={props.onInsertComment}
          Template={MessageToggler}
        />
      )
    })}</div>
  )
}
