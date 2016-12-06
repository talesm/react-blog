import React from 'react';
import EditButtons from './EditButtons'

export default function(Template, Viewer, Editor) {
  class MessageToggler extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        editing: false,
      };
    }

    render() {
      const Content = (this.state.editing) ? Editor : Viewer;
      return (
        <Template>
        <EditButtons disabled={!this.props.editable} onEdit={this.onEditToggle} onRemove={this.onRemove}/>
        <Content {...this.props}/>
        </Template>
      );
    }

    onEditToggle = () => {
      const editing = !this.state.editing;
      this.setState({editing});
    }

    onRemove = () => {
      if(confirm("Are you sure to delete this post?") && this.props.onRemove){
        this.props.onRemove(this.state.message.id);
      }
    }
  }
  return MessageToggler;
};
