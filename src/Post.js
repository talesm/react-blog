import React from 'react';
import PostForm from './PostForm';

export default class extends React.Component{
  constructor(props) {
    super(props);
    this.state = {editing: false}
  }

  render() {
    const post = this.props.post;
    const buttons = (this.props.user === post.user) && (
      <div className="w3-btn-group w3-right">
        <button className="w3-btn" onClick={this.onEdit}>Edit</button>
        <button className="w3-btn" onClick={this.onRemove}>Remove</button>
      </div>
    );
    let content;
    if(this.state.editing){
      content = <PostForm submitButtonText="Submit" title={post.title} content={post.content} onSubmit={this.onEditSubmited}/>;
    } else {
      content = <div className="w3-container w3-theme-light">{post.content}</div>;
    }
    return (
      <div className="App-post w3-card-4 w3-margin">
        {buttons}
        <div className="w3-container w3-theme">
          <h3>{post.title}</h3>
        </div>
        <div className="w3-container w3-theme-l3">
          <span>Created By {post.user} on {post.created.toLocaleString()}</span>
          {post.modified && post.modified !== post.created && (
            <span>Modified on {post.modified.toLocaleString()}</span>
          )}
        </div>
        {content}

      </div>
    );
  }

  onRemove = () => {
    if(confirm("Are you sure to delete this post?") && this.props.onRemove){
      this.props.onRemove(this.props.post.id);
    }
  }

  onEdit = () => {
    this.setState({editing: !this.state.editing});
  }

  onEditSubmited = (post) => {
    if(this.props.onEdit){
      post.id = this.props.post.id;
      this.props.onEdit(post);
    }
    this.setState({editing: false});
  }
}
