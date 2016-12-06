import React from 'react';
import Message from './Message'
import editButtonsWrapper from './editButtonsWrapper'
import Post from './Post'
import PostForm from './PostForm'
import PostViewer from './PostViewer'

export default function PostPanel(props) {
  if(props.posts.length === 0){
    return (<div className="w3-card-4 w3-center w3-theme-light"><h2>No post yet</h2></div>)
  }
  return (
    <div>{props.posts.map(message => {
      const MessageToggler = editButtonsWrapper(Post, PostViewer, PostForm);
      return (
        <Message key={message.id} message={message} user={props.user} onEdit={props.onEdit}
          onRemove={props.onRemove} onInsertComment={props.onInsertComment}
          onEditComment={props.onEditComment} onRemoveComment={props.onRemoveComment}
          Template={MessageToggler}
        />
      )
    })}</div>
  )
}
