import React from 'react';

export default class extends React.Component{
  constructor(props){
    super(props);
    this.state = {title: "", content: ""};
  }

  componentDidMount() {
    this.reset();
  }

  componentWillUnmount() {

  }

  reset(){
    const title = this.props.title||"";
    const content = this.props.content||"";
    this.setState({title, content});
  }

  render() {
    return (
      <form className="App-insert App-post w3-container">
        <input placeholder="Title" className="w3-input"
          onChange={this.titleChange} value={this.state.title}/>
        <textarea placeholder="Content Here." className="w3-input"
          onChange={this.contentChange} value={this.state.content} />
        <button className="w3-btn" onClick={this.submit}>{this.props.submitButtonText}</button>
      </form>
    )
  }

  titleChange = (ev) => {
    this.setState({title: ev.target.value});
  }

  contentChange = (ev) => {
    this.setState({content: ev.target.value});
  }

  submit = (ev) => {
    ev.preventDefault();
    if(this.props.onSubmit){
      this.props.onSubmit(this.state);
    }
    this.reset();
  }
}
