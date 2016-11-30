import React from 'react';
import Comment from "./Comment"

export default class extends React.Component{
  constructor(props){
    super(props);
    this.state = {inserting: false, content: ''};
  }
  render(){
    const comments = this.props.comments || [];
    return (
      <div className="App-comment-box w3-theme-l4 w3-container">
        <div>
          <h4>{comments.length > 0? "Comments:": "No Comments Yet."}</h4>
        </div>
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} onEdit={this.props.onEdit} onRemove={this.props.onRemove}/>
        ))}
        <textarea className="w3-input" onChange={(ev)=>this.setState({content:ev.target.value})}/>
        <button className={"w3-btn-block w3-theme" + (!this.state.content?" w3-disabled":"")}
            onClick={this.onInsert}>
          Insert Comment
        </button>
      </div>
    )
  }

  onInsert = () => {
    if(this.props.onInsert){
      this.props.onInsert({content: this.state.content});
    }
  }
}
