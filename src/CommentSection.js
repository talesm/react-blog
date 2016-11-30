import React from 'react';
import Comment from "./Comment"

export default function CommentSection(props){
  const comments = props.comments || [];
  return (
    <div className="App-comment-box w3-theme-l4 w3-container">
      <div>
        <h4>{comments.length > 0? "Comments:": "No Comments Yet."}</h4>
      </div>
      {comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
      <button className="w3-btn-block w3-theme">Insert Comment</button>
    </div>
  )
}
