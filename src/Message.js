import React from 'react';

function emptyMessage() {
  return {
      content: "",
      title: "",
      user: "",
      created: "",
      modified: "",
      comments: [],
    };
}

export default class extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      message: emptyMessage()
    };
  }

  componentDidMount() {
    this.reset();
  }

  componentWillUnmount() {

  }

  reset(){
    const message = this.props.message;
    if(!message){
      this.setState({message: emptyMessage()});
      return;
    }
    this.setState({
      message: {
        id: message.id,
        content: message.content,
        title: message.title,
        user: message.user,
        created: message.created,
        modified: message.modified,
        lastEdited: message.lastEdited,
        comments: message.comments,
      }
    });
  }

  render() {
    return (
      <this.props.Template
        message={this.state.message}
        onEditTitle={this.onEditTitle}
        onEditContent={this.onEditContent}
        user={this.props.user}
        onSubmit={this.onSubmit}
        onRemove={this.onRemove}
        onInsertComment={this.onInsertComment}
        onEditComment={this.onEditComment}
        onRemoveComment={this.onRemoveComment}
      />
    );
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.message);
    this.reset();
  }

  onRemove = () => {
    this.props.onRemove(this.state.message.id);
  }

  onInsertComment = (comment) => {
    if(this.props.onInsertComment){
      this.props.onInsertComment(this.state.message.id, comment);
    }
  }

  onRemoveComment = (commentId) => {
    if(this.props.onRemoveComment){
      this.props.onRemoveComment(this.state.message.id, commentId);
    }
  }

  onEditTitle = (ev) => {
    const message = this.state.message;
    message.title = ev.target.value
    this.setState({message: message})
  }

  onEditContent = (ev) => {
    const message = this.state.message;
    message.content = ev.target.value
    this.setState({message: message})
  }
}
