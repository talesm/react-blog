import React from 'react';
import PostForm from './PostForm';
import CommentSection from './CommentSection';
import EditButtons from './EditButtons'
import formatText from './formatText'

export default class extends React.Component{
  constructor(props) {
    super(props);
    this.state = {editing: false}
  }

  render() {
    const post = this.props.post;
    let content;
    if(this.state.editing){
      content = <PostForm submitButtonText="Submit" title={post.title} content={post.content} onSubmit={this.onEditSubmited}/>;
    } else {
      content = <div className="w3-container w3-theme-light">{formatText(post.content)}</div>;
    }
    return (
      <div className="App-post w3-card-4 w3-margin">
        <EditButtons disabled={this.props.user !== post.user} onEdit={this.onEdit} onRemove={this.onRemove}/>
        <div className="w3-container w3-theme">
          <h3>{post.title}</h3>
        </div>
        {content}
        <div className="w3-container w3-theme-l4">
        <div>Created By {post.user} on {post.created.toLocaleString()}</div>
        {post.modified && post.modified !== post.created && (
          <div>Modified on {post.modified.toLocaleString()}</div>
        )}
        </div>
        <CommentSection onInsert={this.onInsertComment} onRemove={this.onRemoveComment}
          onEdit={this.onEditComment} comments={post.comments} user={this.props.user}
        />
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

  onInsertComment = (comment) => {
    if(this.props.onInsertComment){
      this.props.onInsertComment(this.props.post.id, comment);
    }
  }

  onEditComment = (comment) => {
    if(this.props.onEditComment){
      this.props.onEditComment(this.props.post.id, comment);
    }
  }

  onRemoveComment = (commentId) => {
    if(this.props.onRemoveComment){
      this.props.onRemoveComment(this.props.post.id, commentId);
    }
  }
}
