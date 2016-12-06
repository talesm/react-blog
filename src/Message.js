import React from 'react';

export default class extends React.Component {
  constructor(props){
    super(props)
    this.state = {
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
    return (
      <this.props.Template
        message={this.state.message}
        onEditTitle={this.onEditTitle}
        onEditContent={this.onEditContent}
        editable={this.props.editable}
        onSubmit={this.onSubmit}
        onRemove={this.onRemove}
      />
    );
  }

  onSubmit = () => {
    this.props.onEdit(this.state.message);
  }

  onRemove = () => {
    this.props.onRemove(this.state.message.id);
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
