import React from 'react';

export default class extends React.Component{
  render() {
    const message = this.props.message||{};
    return (
      <form className="App-insert App-post w3-container">
        <input placeholder="Title" className="w3-input"
          onChange={this.props.onEditTitle} value={message.title}/>
        <textarea placeholder="Content Here." className="w3-input"
          onChange={this.props.onEditContent} value={message.content} />
        <button className="w3-btn" onClick={this.props.onSubmit}>Submit</button>
      </form>
    );
  }
}
