import React from 'react';
import EditButtons from './EditButtons'
import formatText from './formatText'
import update from 'immutability-helper';

function wrapViewer(Template) {
  return function(props){
    const message = update(props.message, {content: {$set: formatText(props.message.content)}});
    return <Template
      {...props}
      message={message}
    />
  };
}

function wrapEditor(Template){
  return function(props){
    const message = update(props.message, {
      title: {$set: (
        <input placeholder="Title" className="w3-input"
          onChange={props.onEditTitle} value={props.message.title} />
      )},
      content: {$set: (
        <textarea placeholder="Content Here." className="w3-input"
          onChange={props.onEditContent} value={props.message.content} />
      )}
    });
    return (
      <form className="App-insert App-post">
        <Template
          {...props}
          message={message}
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
