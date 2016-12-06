import React from 'react';
import Post from './Post';

export default class Message extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editing: false,
      message: {
        content: "",
        title: "",
        user: "",
        created: "",
        modified: "",
        comments: [],
      }
    };
  }

  componentDidMount() {
    this.reset();
  }

  componentWillUnmount() {

  }

  reset(){
    const message = this.props.message;
    this.setState({
      message: {
        id: message.id,
        content: message.content,
        title: message.title,
        user: message.user,
        created: message.created,
        modified: message.modified,
        comments: message.comments,
      }
    });
  }

  render() {
    const message = this.state.message;
    const enableEdit = this.props.user === message.user;
    const Content = (this.state.editing) ? (
      <this.props.Editor message={message} onSubmit={this.onSubmit}
        onEditTitle={this.onEditTitle} onEditContent={this.onEditContent}
      />
    ): (
      <this.props.Viewer message={message}/>
    );
    return (<Post message={message} enableEdit={enableEdit} enableRemove={enableEdit}
      onEditToggle={this.onEditToggle} onRemove={this.onRemove} content={Content}
    />)
  }

  onEditToggle = () => {
    const editing = !this.state.editing;
    this.setState({editing});
    this.reset();
  }

  onRemove = () => {
    if(confirm("Are you sure to delete this post?") && this.props.onRemove){
      this.props.onRemove(this.state.message.id);
    }
  }

  onSubmit = () => {
    this.setState({editing: false});
    const message = this.state.message;
    this.props.onEdit(message);
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
