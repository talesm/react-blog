import React from 'react';
import EditButtons from './EditButtons'

export default class Comment extends React.Component
{
  constructor(props){
    super(props);
    this.state = {editing: false, content: ''};
  }

  componentDidMount() {
    this.reset();
  }

  componentWillUnmount() {

  }

  reset(){
    const content = this.props.comment.content||"";
    this.setState({content});
  }

  render() {
    const comment = this.props.comment;
    let content;
    if(this.state.editing){
      content = (
        <div>
          <textarea className="w3-input" value={this.state.content}
              onChange={(ev)=>this.setState({content: ev.target.value})}
          />
          <button className="w3-btn-block w3-theme" onClick={this.onEdit}>Submit</button>
        </div>
      );
    } else {
      content = (
        <div className="w3-container w3-theme-light">{comment.content}</div>
      );
    }
    return (
      <div className="App-comment w3-card-2 w3-section">
        <EditButtons onRemove={this.onRemove} disabled={this.props.user !== comment.user}
          onEdit={()=>this.setState({editing: !this.state.editing})}
        />
        <div className="w3-container w3-theme-l3">
          On {comment.modified.toLocaleString()}, {comment.user || "Unknown"} said:
        </div>
        {content}
      </div>
    )
  }

  onEdit = () => {
    if(this.props.onEdit){
      this.props.onEdit({id: this.props.comment.id, content: this.state.content});
    }
    this.setState({editing: false});
  }

  onRemove = () => {
    if(confirm("Are you sure you want to remove this comment?") && this.props.onRemove){
      this.props.onRemove(this.props.comment.id);
    }
  }
}
