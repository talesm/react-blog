import React from 'react';
import EditButtons from './EditButtons'
import formatText from './formatText'

function wrapViewer(Template) {
  return function(props){
    return <Template
      {...props.message}
      content={formatText(props.message.content)}
    />
  };
}

function wrapEditor(Template){
  return function(props){
    const message = props.message;
    const title = (
      <input placeholder="Title" className="w3-input"
        onChange={props.onEditTitle} value={message.title}/>
    );
    const content = (
      <textarea placeholder="Content Here." className="w3-input"
        onChange={props.onEditContent} value={message.content} />
    );
    return (
      <form className="App-insert App-post">
        <Template
          {...props.message}
          title={title}
          content={content}
        >
          <button className="w3-btn-block w3-theme" onClick={props.onSubmit}>Submit</button>
        </Template>
      </form>
    );
  }
}

function wrapEditButtons(Template, Viewer, Editor) {
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
        <EditButtons disabled={!this.props.editable} onEdit={this.onEditToggle} onRemove={this.props.onRemove}/>
        <Content {...this.props}/>
        </Template>
      );
    }

    onEditToggle = () => {
      const editing = !this.state.editing;
      this.setState({editing});
    }
  }
  return MessageToggler;
};

export {wrapViewer, wrapEditor, wrapEditButtons};
