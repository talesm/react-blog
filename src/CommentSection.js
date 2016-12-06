import React from 'react';
import Message from "./Message"
import Comment from "./Comment"

function CommentInserter(props) {
  const message = props.message;
  return(
    <div>
      <textarea className="w3-input" value={message.content}
        onChange={props.onEditContent}
        disabled={!props.user}
      />
      <button className={"w3-btn-block w3-theme" + (!message.content?" w3-disabled":"")}
          onClick={props.onSubmit}
      >Insert Comment</button>
    </div>
  );
}

export default class extends React.Component{
  render(){
    const comments = this.props.comments || [];
    return (
      <div className="App-comment-box w3-theme-l4 w3-container">
        <div>
          <h4>{comments.length > 0? "Comments:": "No Comments Yet."}</h4>
        </div>
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} onEdit={this.props.onEditComment}
            onRemove={this.props.onRemoveComment} user={this.props.user}
          />
        ))}
        <Message Template={CommentInserter} user={this.props.user} onSubmit={this.props.onInsertComment}/>
      </div>
    )
  }
}
